import { render, screen, fireEvent } from '../utils/testUtils';
import { DragonCard } from '../../features/dragons/components/DragonCard';

describe('DragonCard Component', () => {
  const mockDragon = {
    id: 1,
    name: 'Test Dragon',
    type: 'Fogo',
    createdAt: '2024-01-01T00:00:00.000Z',
    imageUrl: 'https://test-image.com/dragon.jpg'
  };

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onDetails: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar as informações do dragão', () => {
    render(<DragonCard dragon={mockDragon} {...mockHandlers} />);
    
    expect(screen.getByText('Test Dragon')).toBeInTheDocument();
    expect(screen.getByText(/Criado em:/)).toBeInTheDocument(); 
  });

  test('deve mostrar imagem placeholder quando não há imageUrl', () => {
    const dragonWithoutImage = { ...mockDragon, imageUrl: undefined };
    render(<DragonCard dragon={dragonWithoutImage} {...mockHandlers} />);
    
    const placeholderImage = screen.getByAltText('Dragon placeholder');
    expect(placeholderImage).toHaveAttribute('src', '/dragon-placeholder.png');
  });

  test('deve chamar handlers ao clicar nos botões', () => {
    render(<DragonCard dragon={mockDragon} {...mockHandlers} />);
    
    // primeiro clique para virar o card
    fireEvent.click(screen.getByTestId('dragon-card'));
    
    // agora clica nos botões
    fireEvent.click(screen.getByText('Editar'));
    fireEvent.click(screen.getByText('Excluir'));
    fireEvent.click(screen.getByText('Detalhes'));

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockDragon.id);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockDragon.id);
    expect(mockHandlers.onDetails).toHaveBeenCalledWith(mockDragon.id);
  });
});