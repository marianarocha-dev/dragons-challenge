import { api } from '../../../shared/services/api';

export interface Dragon {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  imageUrl?: string;
}

export const dragonsService = {
  // busca todos os drags
  getAllDragons: async () => {
    const response = await api.get<Dragon[]>('/dragon');
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
  },

  // busca um drag especifico
  getDragonById: async (id: number) => {
    const response = await api.get<Dragon>(`/dragon/${id}`);
    return response.data;
  },

  // cria um novo drag
  createDragon: async (dragon: Omit<Dragon, 'id' | 'createdAt'>) => {
    const response = await api.post<Dragon>('/dragon', dragon);
    return response.data;
  },

  // atualiza um drag
  updateDragon: async (id: number, dragon: Partial<Dragon>) => {
    const response = await api.put<Dragon>(`/dragon/${id}`, dragon);
    return response.data;
  },

  // deleta um drag
  deleteDragon: async (id: number) => {
    await api.delete(`/dragon/${id}`);
  }
};