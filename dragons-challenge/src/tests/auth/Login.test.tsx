import { render, screen, fireEvent, waitFor } from '../utils/testUtils';
import { Login } from '../../features/auth/pages/Login';
import { act } from 'react-dom/test-utils';

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify([
      { id: 1, username: 'testuser', password: 'password123' }
    ]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('deve renderizar o formulário de login', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome de usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
  });

  test('deve fazer login com sucesso', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText('Digite seu nome de usuário'), {
      target: { value: 'testuser' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'password123' }
    });
    
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /entrar/i }));
    });

    await waitFor(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      expect(currentUser).toBeTruthy();
      expect(currentUser.username).toBe('testuser');
    });
  });
});