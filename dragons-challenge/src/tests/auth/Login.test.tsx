import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../../features/auth/pages/Login';

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    // Configurar dados de teste no localStorage
    const testUser = {
      username: 'testuser',
      password: 'password123',
      fullName: 'testuser'
    };
    localStorage.setItem('users', JSON.stringify([testUser]));
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('deve fazer login com sucesso', async () => {
    renderWithRouter(<Login />);
    
    const usernameInput = screen.getByPlaceholderText('Digite seu nome de usuário');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByText('Entrar');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      expect(users.length).toBeGreaterThan(0);
      expect(users[0].username).toBe('testuser');
    });
  });
});