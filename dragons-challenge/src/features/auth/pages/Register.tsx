import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

export function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!fullName || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Criar objeto do usuário
    const user = {
      fullName,
      password,
      id: Date.now(), // ID único baseado no timestamp
      createdAt: new Date().toISOString()
    };

    // Salvar no localStorage
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Redirecionar para o login
      navigate('/login');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      setError('Erro ao cadastrar usuário. Tente novamente');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <Input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Criar senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Cadastrar</Button>
        <StyledLink to="/login">Já tenho uma conta</StyledLink>
      </Form>
    </Container>
  );
}