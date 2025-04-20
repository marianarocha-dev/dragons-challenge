import { useState, useEffect } from 'react';
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-weight: 400;
  color: #828080;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
`;

const Input = styled.input`
   padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  outline: none;

  &:focus {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }

  &::placeholder {
    color: #C4C4C4;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  outline: none;
  cursor: pointer;

  &:focus {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
  }

  &:focus {
    outline: none;
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