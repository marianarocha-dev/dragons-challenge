import { dragonsService } from '../../features/dragons/services/dragonService';
import { api } from '../../shared/services/api';

jest.mock('../../shared/services/api');

describe('dragonsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve buscar todos os dragões', async () => {
    const mockDragons = [
      { id: 1, name: 'Dragon 1' },
      { id: 2, name: 'Dragon 2' }
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockDragons });

    const dragons = await dragonsService.getAllDragons();
    
    expect(dragons).toEqual(mockDragons);
    expect(api.get).toHaveBeenCalledWith('/dragon');
  });

  test('deve criar um novo dragão', async () => {
    const newDragon = { name: 'New Dragon', type: 'Fogo' };
    const mockResponse = { id: 1, ...newDragon };

    (api.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const dragon = await dragonsService.createDragon(newDragon);
    
    expect(dragon).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/dragon', newDragon);
  });
});