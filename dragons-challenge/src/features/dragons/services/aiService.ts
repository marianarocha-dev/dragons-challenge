import { dragonImages, DragonColor, DragonType } from '../data/dragonImages';

type GenerateParams = {
  name: string;
  color: DragonColor;
  type: DragonType;
};

export const aiService = {
  async generateDragonImage({ color, type }: GenerateParams) {
    try {
      console.log('Procurando dragão com as características selecionadas...');
      
      // filtra as imgs que correspondem aos criterios
      const matchingDragons = dragonImages.filter(
        dragon => dragon.color === color && dragon.type === type
      );

      if (matchingDragons.length === 0) {
        throw new Error('Não encontramos dragões com essas características específicas');
      }

      // simula um pequeno deploy
      await new Promise(resolve => setTimeout(resolve, 1000));

      // seleciona aleatoriamente as imgs
      const randomIndex = Math.floor(Math.random() * matchingDragons.length);
      const selectedDragon = matchingDragons[randomIndex];

      console.log('Dragão encontrado com sucesso!');
      return selectedDragon.url;
    } catch (error) {
      console.error('Erro na seleção:', error);
      throw error;
    }
  }
};