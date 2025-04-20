import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PasswordField } from '../components/PasswordInput';


const Container = styled.div`
  padding: 2rem 4rem 2rem 6rem;
  width: 100%;
  min-height: 100vh;
  background: white;;
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

const Card = styled.div`
 position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: 400;
  color: #828080;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
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

  &:disabled {
    background: #f8f9fa;
    color: #828080;
    cursor: not-allowed;
    opacity: 0.8;
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
  border: none;
  border-radius: 28px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  background: white;
  color: #828080;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
   color: #828080;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
}
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  margin-top: 0.5rem;
  text-align: center;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 0.8rem;
  border-radius: 28px;
`;

const SuccessMessage = styled.p`
  color: #00C851;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  margin-top: 0.5rem;
  text-align: center;
  background-color: rgba(0, 200, 81, 0.1);
  padding: 0.8rem;
  border-radius: 28px;
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
              <PasswordField
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Digite para alterar a senha"
      />
    </FormGroup>

            {currentPassword && (
              <>
                
            <FormGroup>
              <Label>Nova senha</Label>
              <PasswordField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite a nova senha"
              />
            </FormGroup>

                <FormGroup>
                      <Label>Confirmar nova senha</Label>
                <PasswordField
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a nova senha"
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