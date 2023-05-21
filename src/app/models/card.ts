export enum Sign {
  SPADES = 'Spades',
  DIAMONDS = 'Diamonds',
  HEARTS = 'Hearts',
  CLUBS = 'Clubs',
}

export type Card = {
  number: number;
  sign: Sign;
};
