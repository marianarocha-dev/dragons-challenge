import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { PasswordField } from "../../profile/components/PasswordInput";

interface User {
  id: number;
  fullName: string;
  password: string;
  createdAt: string;
}

const RegisterPage = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LeftSection = styled.div`
  flex: 1;
  background-image: url('/dragon-pattern.svg');
  background-size: cover;
  background-position: center;
  background-color: #2B1D62;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 2rem;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  padding-bottom: 8px;
  line-height: 1.2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 56px;
  border-radius: 28px;
  border: none;
  background: white;
  font-size: 16px;
  color: #333333;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  &::placeholder {
    color: #C4C4C4;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 72, 255, 0.2);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #C4C4C4;
  font-size: 20px;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 100%);
  color: white;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoginLink = styled(Link)`
  color: #828080;
  font-size: 14px;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
    color: #828080;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
`;

const PasswordContainer = styled.div`
  width: 100%;
`;

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username || !password || !confirmPassword) {
        throw new Error('Por favor, preencha todos os campos');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      
      if (users.some((user: User) => user.fullName === username)) {
        throw new Error('Este nome de usuário já está em uso');
      }

      const newUser: User = {
        id: Date.now(),
        fullName: username,
        password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem(`dragons_${newUser.id}`, JSON.stringify([]));
      
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterPage>
      <LeftSection />
      <RightSection>
        <RegisterContainer>
          <Title>Cadastre-se</Title>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Nome completo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputWrapper>

            <PasswordContainer>
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
            </PasswordContainer>

            <PasswordContainer>
              <PasswordField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita sua senha"
              />
            </PasswordContainer>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <RegisterButton type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </RegisterButton>

            <LoginLink to="/login">
              Já tenho uma conta
            </LoginLink>
          </Form>
        </RegisterContainer>
      </RightSection>
    </RegisterPage>
  );
};

export default Register;