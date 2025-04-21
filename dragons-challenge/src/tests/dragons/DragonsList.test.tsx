import { render, screen, fireEvent, waitFor } from '../utils/testUtils';
import { DragonsList } from '../../features/dragons/pages/DragonsList';

describe('DragonsList Component', () => {
  const mockDragons = [
    { id: 1, name: 'Dragon B', type: 'Fogo', createdAt: '2024-01-01T00:00:00.000Z' },
    { id: 2, name: 'Dragon A', type: 'Água', createdAt: '2024-01-02T00:00:00.000Z' },
    { id: 3, name: 'Dragon C', type: 'Terra', createdAt: '2024-01-03T00:00:00.000Z' }
  ];

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
    localStorage.setItem('dragons_1', JSON.stringify(mockDragons));
  });

  test('deve renderizar lista de dragões em ordem alfabética', async () => {
    render(<DragonsList />);
    
    const dragonNames = await screen.findAllByText(/Dragon [ABC]/);
    expect(dragonNames.map(node => node.textContent)).toEqual([
      'Dragon A',
      'Dragon B',
      'Dragon C'
    ]);
  });

  test('deve mostrar mensagem quando não há dragões', () => {
    localStorage.setItem('dragons_1', '[]');
    render(<DragonsList />);
    
    expect(screen.getByText(/Sua lista está vazia!/)).toBeInTheDocument();
  });

  test('deve abrir modal de detalhes ao clicar em Detalhes', async () => {
    render(<DragonsList />);
    
    // primeiro clique para virar o card
    fireEvent.click(screen.getAllByTestId('dragon-card')[0]);
    
    // clique no botão detalhes
    fireEvent.click(screen.getAllByText('Detalhes')[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Detalhes do Dragão')).toBeInTheDocument();
    });
  });

  test('deve excluir dragão ao confirmar exclusão', async () => {
    window.confirm = jest.fn(() => true);
    render(<DragonsList />);
    
    // primeiro clique para virar o card
    fireEvent.click(screen.getAllByTestId('dragon-card')[0]);
    
    // clique no botão excluir
    fireEvent.click(screen.getAllByText('Excluir')[0]);
    
    await waitFor(() => {
      const dragons = JSON.parse(localStorage.getItem('dragons_1') || '[]');
      expect(dragons).toHaveLength(2);
    });
  });
});