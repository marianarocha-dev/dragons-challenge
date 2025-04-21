import styled from 'styled-components';
import { Modal } from '../../../shared/components/Modal';

const Title = styled.h2`
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  padding-bottom: 8px;
  line-height: 1.2;
`;

const InfoContainer = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #828080;
  font-size: 16px;
`;

const Value = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #828080;
  font-size: 13px;
`;

interface DragonDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dragon: {
    name: string;
    type: string;
    createdAt: string;
  } | null;
}

export function DragonDetailsModal({ isOpen, onClose, dragon }: DragonDetailsModalProps) {
  if (!dragon) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <button 
        onClick={onClose} 
        aria-label="Fechar modal"
        style={{ 
          position: 'absolute', 
          right: '1rem', 
          top: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
      <Title>Detalhes do Dragão</Title>
      <InfoContainer>
        <InfoItem>
          <Label>Nome:</Label>
          <Value>{dragon.name}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Tipo:</Label>
          <Value>{dragon.type}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Cor:</Label>
          <Value>{dragon.color}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Data de Criação:</Label>
          <Value>{formatDate(dragon.createdAt)}</Value>
        </InfoItem>
      </InfoContainer>
    </Modal>
  );
}