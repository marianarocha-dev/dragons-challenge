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
  position: relative;
  width: 280px;
  height: 380px;
  perspective: 1000px;
  cursor: pointer;
  margin: 0 auto;
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
  border-radius: 20px;
  background: white;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const CardFront = styled(CardSide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  padding: 3px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DragonName = styled.h3`
  color: #828080;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  margin: 0;
`;

const DragonDate = styled.p`
  color: #828080;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:focus{
    outline: none;  //garantindo que o outline nao apareça
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export function DragonCard({ dragon, onEdit, onDelete, onDetails }: DragonCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card onClick={handleFlip} data-testid="dragon-card">
      <CardInner $isFlipped={isFlipped}>
        <CardFront>
          <ImageContainer>
            <ImageWrapper>
            {dragon.imageUrl ? (
              <img src={dragon.imageUrl} alt={dragon.name} />
            ) : (
              <img src="/dragon-placeholder.png" alt="Dragon placeholder" />
            )}
            </ImageWrapper>
          </ImageContainer>
          <DragonName>{dragon.name}</DragonName>
          <DragonDate>Criado em: {formatDate(dragon.createdAt)}</DragonDate>
        </CardFront>
        <CardBack>
          <Button onClick={(e) => {
            e.stopPropagation();
            onEdit(dragon.id);
          }}>
            Editar
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation();
            onDelete(dragon.id);
          }}>
            Excluir
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation();
            onDetails(dragon.id);
          }}>
            Detalhes
          </Button>
        </CardBack>
      </CardInner>
    </Card>
  );
}