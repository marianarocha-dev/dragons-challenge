import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';

interface User {
  id: number;
  fullName: string;
  password: string;
  createdAt: string;
}

const LoginPage = styled.div`
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

const LoginContainer = styled.div`
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

const ForgotPassword = styled(Link)`
  color: #828080;
  font-size: 14px;
  text-align: right;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
    color: #828080;
  }
`;

const LoginButton = styled.button`
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

const RegisterLink = styled(Link)`
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

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const user = users.find((u: User) => u.fullName === username && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dragons');
      } else {
        throw new Error('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPage>
      <LeftSection />
      <RightSection>
        <LoginContainer>
          <Title>Login</Title>
          <Form onSubmit={handleLogin}>
            <InputWrapper>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputWrapper>

            <InputWrapper>
              <IconWrapper>
                <FaLock />
              </IconWrapper>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputWrapper>

            <ForgotPassword to="/forgot-password">
              Esqueci minha senha
            </ForgotPassword>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </LoginButton>

            <RegisterLink to="/register">
              Ainda não tenho cadastro
            </RegisterLink>
          </Form>
        </LoginContainer>
      </RightSection>
    </LoginPage>
  );
}

export default Login;