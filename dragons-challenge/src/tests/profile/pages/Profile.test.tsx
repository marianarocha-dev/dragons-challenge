import { render, screen, fireEvent, waitFor } from '../../utils/testUtils';
import { Profile } from '../../../features/profile/pages/Profile';

describe('Profile Component', () => {
  const mockUser = {
    id: 1,
    fullName: 'Test User',
    password: 'password123',
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    localStorage.setItem('users', JSON.stringify([mockUser]));
  });

  test('deve renderizar dados do usuário', () => {
    render(<Profile />);
    
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/\d{2}\/\d{2}\/\d{4}/)).toBeInTheDocument();
  });

  test('deve permitir edição após clicar em Editar', async () => {
    render(<Profile />);
    
    fireEvent.click(screen.getByText('Editar'));
    
    const nameInput = screen.getByDisplayValue('Test User');
    fireEvent.change(nameInput, { target: { value: 'Updated User' } });
    
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      expect(updatedUser.fullName).toBe('Updated User');
    });
  });

  test('deve validar senha atual ao tentar alterar senha', async () => {
    render(<Profile />);
    
    fireEvent.click(screen.getByText('Editar'));
    
    fireEvent.change(screen.getByPlaceholderText('Digite para alterar a senha'), {
      target: { value: 'wrongpassword' }
    });
    
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Senha atual incorreta')).toBeInTheDocument();
    });
  });
});