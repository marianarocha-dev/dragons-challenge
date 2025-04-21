import { render, screen, fireEvent, waitFor } from '../utils/testUtils';
import { DragonEditModal } from '../../features/dragons/components/DragonEditModal';

describe('DragonEditModal Component', () => {
  const mockDragon = {
    name: 'Test Dragon',
    type: 'Fogo'
  };

  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSave: jest.fn(),
    dragon: mockDragon
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o formulário com os dados do dragão', () => {
    render(<DragonEditModal {...mockProps} />);
    
    expect(screen.getByDisplayValue('Test Dragon')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Fogo')).toBeInTheDocument();
  });

  test('deve chamar onSave com dados atualizados', async () => {
    render(<DragonEditModal {...mockProps} />);
    
    fireEvent.change(screen.getByLabelText('Nome:'), {
      target: { value: 'Updated Dragon' }
    });
    
    fireEvent.change(screen.getByLabelText('Tipo:'), {
      target: { value: 'Água' }
    });
    
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(mockProps.onSave).toHaveBeenCalledWith({
        name: 'Updated Dragon',
        type: 'Água'
      });
    });
  });
});