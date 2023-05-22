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

export function cardComparison(card1: Card, card2: Card) {
  if (card1.number > card2.number) return 1;
  if (card1.number < card2.number) return -1;
  return 0;
}
