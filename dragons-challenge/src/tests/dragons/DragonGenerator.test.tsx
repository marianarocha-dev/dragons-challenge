import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DragonGenerator } from '../../features/dragons/pages/DragonGenerator';

describe('DragonGenerator Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock do localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('deve mostrar erro quando campos obrigatórios não estão preenchidos', async () => {
    renderWithRouter(<DragonGenerator onGenerateDragon={mockOnSubmit} />);
    
    // Encontrar e submeter o formulário
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // Aguardar e verificar a mensagem de erro
    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Por favor, preencha todos os campos.');
    });
  });

  test('deve chamar onGenerateDragon quando o formulário é preenchido corretamente', async () => {
    renderWithRouter(<DragonGenerator onGenerateDragon={mockOnSubmit} />);

    // Preencher os campos
    const nameInput = screen.getByPlaceholderText('Digite o nome do dragão');
    const typeSelect = screen.getByLabelText('Tipo do Dragão');
    const colorSelect = screen.getByLabelText('Cor do Dragão');

    fireEvent.change(nameInput, { target: { value: 'Dragão Teste' } });
    fireEvent.change(typeSelect, { target: { value: 'Fogo' } });
    fireEvent.change(colorSelect, { target: { value: 'Vermelho' } });

    // Submeter o formulário
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // Verificar se a função foi chamada com os valores corretos
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Dragão Teste',
        type: 'Fogo',
        color: 'Vermelho'
      });
    });
  });

  test('deve permitir salvar o dragão gerado', async () => {
    renderWithRouter(<DragonGenerator onGenerateDragon={mockOnSubmit} />);

    // Preencher e submeter o formulário
    const nameInput = screen.getByPlaceholderText('Digite o nome do dragão');
    const typeSelect = screen.getByLabelText('Tipo do Dragão');
    const colorSelect = screen.getByLabelText('Cor do Dragão');

    fireEvent.change(nameInput, { target: { value: 'Dragão Teste' } });
    fireEvent.change(typeSelect, { target: { value: 'Fogo' } });
    fireEvent.change(colorSelect, { target: { value: 'Vermelho' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // Aguardar o botão de salvar aparecer e clicar nele
    await waitFor(() => {
      const saveButton = screen.getByText('Adicionar à Lista');
      fireEvent.click(saveButton);
    });

    // Verificar se o localStorage foi chamado
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});