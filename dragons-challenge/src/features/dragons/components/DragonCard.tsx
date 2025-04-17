import styled from 'styled-components';
import { useState } from 'react';

interface DragonCardProps {
  dragon: {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    imageUrl?: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetails: (id: number) => void;
}

const Card = styled.div`
  width: 280px;
  height: 350px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: white;
  padding: 1.5rem;
`;

const CardFront = styled(CardSide)``;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const DragonImage = styled.div<{ $imageUrl?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  background: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : '#f0f0f0'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const DragonName = styled.h3`
  margin: 0.5rem 0;
  color: #2c3e50;
`;

const DragonInfo = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const EditButton = styled(Button)`
  background: #3498db;
  color: white;
  &:hover {
    background: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background: #e74c3c;
  color: white;
  &:hover {
    background: #c0392b;
  }
`;

const DetailsButton = styled(Button)`
  background: #2ecc71;
  color: white;
  &:hover {
    background: #27ae60;
  }
`;

export function DragonCard({ dragon, onEdit, onDelete, onDetails }: DragonCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card onClick={handleFlip}>
      <CardInner $isFlipped={isFlipped}>
        <CardFront>
          <DragonImage $imageUrl={dragon.imageUrl}>
            {!dragon.imageUrl && '🐲'}
          </DragonImage>
          <DragonName>{dragon.name}</DragonName>
          <DragonInfo>Criado em: {formatDate(dragon.createdAt)}</DragonInfo>
        </CardFront>
        <CardBack>
          <EditButton onClick={(e) => {
            e.stopPropagation();
            onEdit(dragon.id);
          }}>
            Editar
          </EditButton>
          <DeleteButton onClick={(e) => {
            e.stopPropagation();
            onDelete(dragon.id);
          }}>
            Excluir
          </DeleteButton>
          <DetailsButton onClick={(e) => {
            e.stopPropagation();
            onDetails(dragon.id);
          }}>
            Detalhes
          </DetailsButton>
        </CardBack>
      </CardInner>
    </Card>
  );
}