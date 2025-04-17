import styled from 'styled-components';
import { Modal } from '../../../shared/components/Modal';

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const InfoContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

const Value = styled.span`
  color: #2c3e50;
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
          <Label>Data de Criação:</Label>
          <Value>{formatDate(dragon.createdAt)}</Value>
        </InfoItem>
      </InfoContainer>
    </Modal>
  );
}