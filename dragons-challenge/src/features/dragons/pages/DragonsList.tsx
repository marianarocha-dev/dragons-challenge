import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DragonCard } from '../components/DragonCard';
import { DragonDetailsModal } from '../components/DragonDetailsModal';
import { DragonEditModal } from '../components/DragonEditModal';
import { dragonsService, Dragon } from '../services/dragonService';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin: 2rem 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  font-size: 1.2rem;
  margin: 2rem 0;
`;

export function DragonsList() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // carregar dragoes
  const loadDragons = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dragonsService.getAllDragons();
      setDragons(data);
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
        await dragonsService.deleteDragon(id);
        setDragons(dragons.filter(dragon => dragon.id !== id));
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
        const updated = await dragonsService.updateDragon(selectedDragon.id, updatedDragon);
        setDragons(prevDragons => 
          prevDragons
            .map(dragon => dragon.id === selectedDragon.id ? updated : dragon)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
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