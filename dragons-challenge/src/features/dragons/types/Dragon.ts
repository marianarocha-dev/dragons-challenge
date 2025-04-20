import { DragonColor, DragonType } from '../data/dragonImages';

export interface Dragon {
  id: number;
  name: string;
  type: DragonType;
  color: DragonColor;
  imageUrl: string;
  createdAt: string;
  histories: string[];
}