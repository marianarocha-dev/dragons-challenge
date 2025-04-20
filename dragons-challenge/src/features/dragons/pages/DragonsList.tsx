import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DragonCard } from '../components/DragonCard';
import { DragonDetailsModal } from '../components/DragonDetailsModal';
import { DragonEditModal } from '../components/DragonEditModal';

interface Dragon {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  imageUrl?: string;
}

const Container = styled.div`
  padding: 2rem 4rem 2rem 6rem;
  width: 100%;
  min-height: 100vh;
  background: white;
  max-width: 1440px; //limita a largura max para telas mto grandes
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  padding-bottom: 8px;
  line-height: 1.2;
  
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  padding: 1rem 2rem 1rem 0;
  width: 100%;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #828080;
  font-size: 1.2rem;
  margin: 2rem 0;
  font-family: 'Inter', sans-serif;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff4444;
  font-size: 1.2rem;
  margin: 2rem 0;
  font-family: 'Inter', sans-serif;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #828080;
  font-size: 1.2rem;
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
`;

export function DragonsList() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDragons = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userDragons = JSON.parse(localStorage.getItem(`dragons_${currentUser.id}`) || '[]');
      
      const sortedDragons = userDragons.sort((a: Dragon, b: Dragon) => 
        a.name.localeCompare(b.name)
      );
      
      setDragons(sortedDragons);
    } catch (err) {
      setError('Erro ao carregar dragões. Por favor, tente novamente.');
      console.error('Erro ao carregar dragões:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDragons();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadDragons();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleEdit = (id: number) => {
    const dragon = dragons.find(d => d.id === id);
    if (dragon) {
      setSelectedDragon(dragon);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este dragão?')) {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const updatedDragons = dragons.filter(dragon => dragon.id !== id);
        localStorage.setItem(`dragons_${currentUser.id}`, JSON.stringify(updatedDragons));
        setDragons(updatedDragons);
      } catch (err) {
        console.error('Erro ao deletar dragão:', err);
        alert('Erro ao deletar dragão. Por favor, tente novamente.');
      }
    }
  };

  const handleDetails = (id: number) => {
    const dragon = dragons.find(d => d.id === id);
    if (dragon) {
      setSelectedDragon(dragon);
      setIsDetailsModalOpen(true);
    }
  };

  const handleSaveEdit = async (updatedDragon: { name: string; type: string }) => {
    if (selectedDragon) {
      try {
        const updatedDragonFull = {
          ...selectedDragon,
          ...updatedDragon
        };

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const updatedDragons = dragons.map(dragon => 
          dragon.id === selectedDragon.id ? updatedDragonFull : dragon
        ).sort((a, b) => a.name.localeCompare(b.name));

        localStorage.setItem(`dragons_${currentUser.id}`, JSON.stringify(updatedDragons));
        setDragons(updatedDragons);
        setIsEditModalOpen(false);
      } catch (err) {
        console.error('Erro ao atualizar dragão:', err);
        alert('Erro ao atualizar dragão. Por favor, tente novamente.');
      }
    }
  };

  if (isLoading) {
    return <LoadingMessage>Carregando dragões...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Lista de Dragões</Title>
      {dragons.length === 0 ? (
        <EmptyMessage>
          Sua lista está vazia! Quando você adicionar um novo dragão ele aparecerá aqui.
        </EmptyMessage>
      ) : (
        <GridContainer>
          {dragons.map(dragon => (
            <DragonCard
              key={dragon.id}
              dragon={dragon}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDetails={handleDetails}
            />
          ))}
        </GridContainer>
      )}

      <DragonDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        dragon={selectedDragon}
      />

      <DragonEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        dragon={selectedDragon}
      />
    </Container>
  );
}

export default DragonsList;