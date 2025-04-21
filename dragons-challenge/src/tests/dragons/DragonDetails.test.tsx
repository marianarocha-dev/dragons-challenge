import { render, screen, fireEvent } from '../utils/testUtils';
import { DragonDetailsModal } from '../../features/dragons/components/DragonDetailsModal';

describe('DragonDetailsModal Component', () => {
  const mockDragon = {
    id: 1,
    name: 'Test Dragon',
    type: 'Fire',
    color: 'Red',
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    dragon: mockDragon
  };

  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 1, name: 'Test User' }));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('deve renderizar os detalhes do dragão no modal', () => {
    render(<DragonDetailsModal {...mockProps} />);
    
    expect(screen.getByText('Test Dragon')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
    
  });

  test('deve chamar onClose quando o botão de fechar é clicado', () => {
    render(<DragonDetailsModal {...mockProps} />);
    
    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);
    
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});