import { render, screen, fireEvent } from '../utils/testUtils';
import { DragonGenerator } from '../../features/dragons/pages/DragonGenerator';

describe('DragonGenerator Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('deve renderizar o formulário de geração', () => {
    render(<DragonGenerator />);
    expect(screen.getByText('Gerador de Dragões')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome do dragão')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Tipo do Dragão' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Cor do Dragão' })).toBeInTheDocument();
  });

  test('deve gerar um dragão com as características selecionadas', async () => {
    render(<DragonGenerator />);
    
    fireEvent.change(screen.getByPlaceholderText('Digite o nome do dragão'), {
      target: { value: 'Dragon Test' }
    });
    
    fireEvent.change(screen.getByRole('combobox', { name: 'Tipo do Dragão' }), {
      target: { value: 'Fogo' }
    });
    
    fireEvent.change(screen.getByRole('combobox', { name: 'Cor do Dragão' }), {
      target: { value: 'Vermelho' }
    });
    
    const generateButton = screen.getByText('Gerar Dragão');
    fireEvent.click(generateButton);

    await screen.findByTestId('dragon-card');
  });
});