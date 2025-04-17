import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
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

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: #2ecc71;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface User {
  id: number;
  fullName: string;
  password: string;
  createdAt: string;
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // carregar dados do user (localstorage)
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setFullName(userData.fullName);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFullName(user?.fullName || '');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleSave = () => {
    setError('');
    setSuccess('');

    if (!user) return; // garantir que user existe

    // validaçoes
    if (!fullName.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (currentPassword) {
      if (currentPassword !== user.password) {
        setError('Senha atual incorreta');
        return;
      }

      if (!newPassword) {
        setError('Digite a nova senha');
        return;
      }

      if (newPassword.length < 6) {
        setError('A nova senha deve ter pelo menos 6 caracteres');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
    }

    // atualizar usuario
    const updatedUser: User = {
      id: user.id,
      fullName: fullName.trim(),
      password: newPassword || user.password,
      createdAt: user.createdAt
    };

    try {
      // atualizar no localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // atualizar na lista de users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => 
        u.id === updatedUser.id ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setUser(updatedUser);
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setError('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  if (!user) {
    return <Container>Carregando...</Container>;
  }

  return (
    <Container>
      <Title>Meu Perfil</Title>
      <Card>
        <FormGroup>
          <Label>Nome completo</Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={!isEditing}
          />
        </FormGroup>

        {isEditing && (
          <>
            <FormGroup>
              <Label>Senha atual</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite para alterar a senha"
              />
            </FormGroup>

            {currentPassword && (
              <>
                <FormGroup>
                  <Label>Nova senha</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Confirmar nova senha</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
              </>
            )}
          </>
        )}

        <FormGroup>
          <Label>Data de cadastro</Label>
          <Input
            type="text"
            value={new Date(user.createdAt).toLocaleDateString('pt-BR')}
            disabled
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <ButtonGroup>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Salvar</Button>
              <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            </>
          ) : (
            <Button onClick={handleEdit}>Editar</Button>
          )}
        </ButtonGroup>
      </Card>
    </Container>
  );
}