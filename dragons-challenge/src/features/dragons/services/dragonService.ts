import { api } from '../../../shared/services/api';

export interface Dragon {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  imageUrl?: string;
}

export const dragonsService = {
  // Buscar todos os dragões
  getAllDragons: async () => {
    const response = await api.get<Dragon[]>('/dragon');
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
  },

  // Buscar um dragão específico
  getDragonById: async (id: number) => {
    const response = await api.get<Dragon>(`/dragon/${id}`);
    return response.data;
  },

  // Criar um novo dragão
  createDragon: async (dragon: Omit<Dragon, 'id' | 'createdAt'>) => {
    const response = await api.post<Dragon>('/dragon', dragon);
    return response.data;
  },

  // Atualizar um dragão
  updateDragon: async (id: number, dragon: Partial<Dragon>) => {
    const response = await api.put<Dragon>(`/dragon/${id}`, dragon);
    return response.data;
  },

  // Deletar um dragão
  deleteDragon: async (id: number) => {
    await api.delete(`/dragon/${id}`);
  }
};