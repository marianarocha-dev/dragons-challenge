import { render, screen, fireEvent, waitFor } from '../utils/testUtils';
import { Register } from '../../features/auth/pages/Register';

describe('Register Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('deve renderizar o formulário de registro', () => {
    render(<Register />);
    expect(screen.getByText('Cadastre-se')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repita sua senha')).toBeInTheDocument();
  });

  test('deve mostrar erro quando senhas não coincidem', async () => {
    render(<Register />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'New User' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Repita sua senha'), {
      target: { value: 'password456' }
    });
    
    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
    });
  });

  test('deve cadastrar usuário com sucesso', async () => {
    render(<Register />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'New User' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Repita sua senha'), {
      target: { value: 'password123' }
    });
    
    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      expect(users).toHaveLength(1);
      expect(users[0].fullName).toBe('New User');
    });
  });
});