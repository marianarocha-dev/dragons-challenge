import { render, screen, fireEvent } from '../utils/testUtils';
import { DragonDetailsModal } from '../../features/dragons/components/DragonDetailsModal';

describe('DragonDetailsModal Component', () => {
  const mockDragon = {
    name: 'Test Dragon',
    type: 'Fogo',
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    dragon: mockDragon
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar os detalhes do dragão', () => {
    render(<DragonDetailsModal {...mockProps} />);
    
    expect(screen.getByText('Test Dragon')).toBeInTheDocument();
    expect(screen.getByText('Fogo')).toBeInTheDocument();
    expect(screen.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeInTheDocument();
  });

  test('não deve renderizar quando isOpen é false', () => {
    render(<DragonDetailsModal {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Detalhes do Dragão')).not.toBeInTheDocument();
  });

  test('deve chamar onClose ao clicar no botão de fechar', () => {
    render(<DragonDetailsModal {...mockProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});