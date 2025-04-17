import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../../../shared/components/Modal';

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #666;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

interface DragonEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dragon: { name: string; type: string }) => void;
  dragon: {
    name: string;
    type: string;
  } | null;
}

export function DragonEditModal({ isOpen, onClose, onSave, dragon }: DragonEditModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (dragon) {
      setName(dragon.name);
      setType(dragon.type);
    }
  }, [dragon]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, type });
    onClose();
  };

  const dragonTypes = [
    'Fogo',
    'Água',
    'Terra',
    'Ar',
    'Gelo',
    'Elétrico',
    'Noturno',
    'Venenoso',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Editar Dragão</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Tipo:</Label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            {dragonTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">Salvar</Button>
      </Form>
    </Modal>
  );
}