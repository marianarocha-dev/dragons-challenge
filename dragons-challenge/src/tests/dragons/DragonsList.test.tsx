import { render, screen, fireEvent, waitFor } from '../utils/testUtils';
import { DragonsList } from '../../features/dragons/pages/DragonsList';

describe('DragonsList Component', () => {
  const mockDragons = [
    { id: 1, name: 'Dragon C', type: 'Fire', createdAt: '2024-01-01T00:00:00.000Z' },
    { id: 2, name: 'Dragon A', type: 'Ice', createdAt: '2024-01-02T00:00:00.000Z' },
    { id: 3, name: 'Dragon B', type: 'Earth', createdAt: '2024-01-03T00:00:00.000Z' }
  ];

  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    localStorage.setItem('dragons_1', JSON.stringify(mockDragons));
    localStorage.setItem('currentUser', JSON.stringify({ id: 1, name: 'Test User' }));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('deve renderizar a lista de dragões', async () => {
    render(<DragonsList />);
    await waitFor(() => {
      expect(screen.getByText('Dragon A')).toBeInTheDocument();
      expect(screen.getByText('Dragon B')).toBeInTheDocument();
      expect(screen.getByText('Dragon C')).toBeInTheDocument();
    });
  });

  test('deve permitir excluir um dragão', async () => {
    render(<DragonsList />);
    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Excluir');
      fireEvent.click(deleteButtons[0]);
      expect(window.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir este dragão?');
    });
  });

  test('deve mostrar detalhes do dragão ao clicar', async () => {
    render(<DragonsList />);
    await waitFor(() => {
      const detailsButtons = screen.getAllByText('Detalhes');
      fireEvent.click(detailsButtons[0]);
      expect(screen.getAllByText('Dragon A')).toHaveLength(2);
      expect(screen.getByText('Ice')).toBeInTheDocument();
    });
  });
});