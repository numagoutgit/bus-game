export enum Sign {
  SPADES = 'spades',
  DIAMONDS = 'diamonds',
  HEARTS = 'hearts',
  CLUBS = 'clubs',
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
