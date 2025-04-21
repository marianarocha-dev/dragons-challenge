import { render, screen, fireEvent, waitFor } from '../utils/testUtils'
import { CreateDragon } from '../../features/dragons/pages/CreateDragon';
import '@testing-library/jest-dom';

describe('CreateDragon Component', () => {
  beforeEach(() => {
    localStorage.clear();
    const currentUser = { id: 1, fullName: 'Test User' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  });

  test('deve renderizar o formulário de criação', () => {
    render(<CreateDragon />);
    
    expect(screen.getByPlaceholderText('Nome do dragão')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tipo do dragão')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  test('deve criar um novo dragão com sucesso', async () => {
    render(<CreateDragon />);
    
    const nameInput = screen.getByPlaceholderText('Nome do dragão');
    const typeInput = screen.getByPlaceholderText('Tipo do dragão');
    
    fireEvent.change(nameInput, { target: { value: 'New Dragon' } });
    fireEvent.change(typeInput, { target: { value: 'Fire' } });
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dragons = JSON.parse(localStorage.getItem('dragons_1') || '[]');
      expect(dragons).toHaveLength(1);
      expect(dragons[0].name).toBe('New Dragon');
    });
  });

  test('deve validar campos obrigatórios', async () => {
    render(<CreateDragon />);
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, preencha todos os campos')).toBeInTheDocument();
    });
  });
});