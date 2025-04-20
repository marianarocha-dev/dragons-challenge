export type DragonColor = 
  | 'Amarelo'
  | 'Azul'
  | 'Rosa'
  | 'Roxo'
  | 'Verde'
  | 'Vermelho'

export type DragonType = 
  | 'Fogo'
  | 'Água'
  | 'Terra'
  | 'Ar'
  | 'Gelo'
  | 'Elétrico'
  | 'Noturno'
  | 'Venenoso';

interface DragonImage {
  color: DragonColor;
  type: DragonType;
  url: string;
}

export const dragonImages: DragonImage[] = [

  // dragoes vermelhos
  {
    color: 'Vermelho',
    type: 'Fogo',
    url: '/assets/dragons/vermelho/v-fogo.png'
  },
  {
    color: 'Vermelho',
    type: 'Água',
    url: '/assets/dragons/vermelho/v-agua.png'
  },
  {
    color: 'Vermelho',
    type: 'Terra',
    url: '/assets/dragons/vermelho/v-terra.png'
  },
  {
    color: 'Vermelho',
    type: 'Ar',
    url: '/assets/dragons/vermelho/v-ar.png'
  },
  {
    color: 'Vermelho',
    type: 'Gelo',
    url: '/assets/dragons/vermelho/v-gelo.png'
  },
  {
    color: 'Vermelho',
    type: 'Elétrico',
    url: '/assets/dragons/vermelho/v-noturno.png'
  },
  {
    color: 'Vermelho',
    type: 'Noturno',
    url: '/assets/dragons/vermelho/v-noturno.png'
  },
  {
    color: 'Vermelho',
    type: 'Venenoso',
    url: '/assets/dragons/vermelho/v-venenoso.png'
  },

  // dragoes azuis
  {
    color: 'Azul',
    type: 'Fogo',
    url: '/assets/dragons/azul/az-1.png'
  },
  {
    color: 'Azul',
    type: 'Água',
    url: '/assets/dragons/azul/az-2.png'
  },
  {
    color: 'Azul',
    type: 'Terra',
    url: '/assets/dragons/azul/az-3.png'
  },
  {
    color: 'Azul',
    type: 'Ar',
    url: '/assets/dragons/azul/az-4.png'
  },
  {
    color: 'Azul',
    type: 'Gelo',
    url: '/assets/dragons/azul/az-5.png'
  },
  {
    color: 'Azul',
    type: 'Elétrico',
    url: '/assets/dragons/azul/az-6.png'
  },
  {
    color: 'Azul',
    type: 'Noturno',
    url: '/assets/dragons/azul/az-7.png'
  },
  {
    color: 'Azul',
    type: 'Venenoso',
    url: '/assets/dragons/azul/az-8.png'
  },

  // dragoes amarelos
  {
    color: 'Amarelo',
    type: 'Fogo',
    url: '/assets/dragons/amarelo/a-fogo.png'
  },
  {
    color: 'Amarelo',
    type: 'Água',
    url: '/assets/dragons/amarelo/a-agua.png'
  },
  {
    color: 'Amarelo',
    type: 'Terra',
    url: '/assets/dragons/amarelo/a-terra.png'
  },
  {
    color: 'Amarelo',
    type: 'Ar',
    url: '/assets/dragons/amarelo/a-ar.png'
  },
  {
    color: 'Amarelo',
    type: 'Gelo',
    url: '/assets/dragons/amarelo/a-gelo.png'
  },
  {
    color: 'Amarelo',
    type: 'Elétrico',
    url: '/assets/dragons/amarelo/a-eletrico.png'
  },
  {
    color: 'Amarelo',
    type: 'Noturno',
    url: '/assets/dragons/amarelo/a-not.png'
  },
  {
    color: 'Amarelo',
    type: 'Venenoso',
    url: '/assets/dragons/amarelo/a-ven.png'
  },

  // dragoes rosa
  {
    color: 'Rosa',
    type: 'Fogo',
    url: '/assets/dragons/rosa/r-1.png'
  },
  {
    color: 'Rosa',
    type: 'Água',
    url: '/assets/dragons/rosa/r-2.png'
  },
  {
    color: 'Rosa',
    type: 'Terra',
    url: '/assets/dragons/rosa/r-3.png'
  },
  {
    color: 'Rosa',
    type: 'Ar',
    url: '/assets/dragons/rosa/r-4.png'
  },
  {
    color: 'Rosa',
    type: 'Gelo',
    url: '/assets/dragons/rosa/r-5.png'
  },
  {
    color: 'Rosa',
    type: 'Elétrico',
    url: '/assets/dragons/rosa/r-6.png'
  },
  {
    color: 'Rosa',
    type: 'Noturno',
    url: '/assets/dragons/rosa/r-7.png'
  },
  {
    color: 'Rosa',
    type: 'Venenoso',
    url: '/assets/dragons/rosa/r-8.png'
  },

  // dragoes roxo
  {
    color: 'Roxo',
    type: 'Fogo',
    url: '/assets/dragons/roxo/rx-1.png'
  },
  {
    color: 'Roxo',
    type: 'Água',
    url: '/assets/dragons/roxo/rx-2.png'
  },
  {
    color: 'Roxo',
    type: 'Terra',
    url: '/assets/dragons/roxo/rx-3.png'
  },
  {
    color: 'Roxo',
    type: 'Ar',
    url: '/assets/dragons/roxo/rx-4.png'
  },
  {
    color: 'Roxo',
    type: 'Gelo',
    url: '/assets/dragons/roxo/rx-5.png'
  },
  {
    color: 'Roxo',
    type: 'Elétrico',
    url: '/assets/dragons/roxo/rx-6.png'
  },
  {
    color: 'Roxo',
    type: 'Noturno',
    url: '/assets/dragons/roxo/rx-7.png'
  },
  {
    color: 'Roxo',
    type: 'Venenoso',
    url: '/assets/dragons/roxo/rx-8.png'
  },

  // dragoes verde
  {
    color: 'Verde',
    type: 'Fogo',
    url: '/assets/dragons/verde/verde1.png'
  },
  {
    color: 'Verde',
    type: 'Água',
    url: '/assets/dragons/verde/verde2.png'
  },
  {
    color: 'Verde',
    type: 'Terra',
    url: '/assets/dragons/verde/verde3.png'
  },
  {
    color: 'Verde',
    type: 'Ar',
    url: '/assets/dragons/verde/verde4.png'
  },
  {
    color: 'Verde',
    type: 'Gelo',
    url: '/assets/dragons/verde/verde5.png'
  },
  {
    color: 'Verde',
    type: 'Elétrico',
    url: '/assets/dragons/verde/verde6.png'
  },
  {
    color: 'Verde',
    type: 'Noturno',
    url: '/assets/dragons/verde/verde7.png'
  },
  {
    color: 'Verde',
    type: 'Venenoso',
    url: '/assets/dragons/verde/verde8.png'
  }
];