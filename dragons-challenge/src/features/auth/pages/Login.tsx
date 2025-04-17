import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #357abd;
  }
`;

const StyledLink = styled(Link)`
  color: #4a90e2;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('currentUser') !== null;
    if (isAuthenticated) {
      navigate('/dragons');
    }
  }, [navigate]);

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!fullName || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      // Buscar usuários do localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Procurar usuário pelo nome
      const user = users.find((u: { fullName: string; password: string }) => 
        u.fullName === fullName && u.password === password
      );

      if (user) {
        // Salvar informação de que usuário está logado
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirecionar para a lista de dragões
        navigate('/dragons');
      } else {
        setError('Nome de usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Entrar</Button>
        <StyledLink to="/register">Ainda não tenho cadastro</StyledLink>
      </Form>
    </Container>
  );
}