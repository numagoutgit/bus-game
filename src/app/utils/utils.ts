import { Sign } from '../models/card';

export function getOrderedDeck() {
  let orderedDeck = [];
  for (let number = 1; number <= 13; ++number) {
    orderedDeck.push({ number, sign: Sign.CLUBS });
    orderedDeck.push({ number, sign: Sign.HEARTS });
    orderedDeck.push({ number, sign: Sign.DIAMONDS });
    orderedDeck.push({ number, sign: Sign.SPADES });
  }
  return orderedDeck;
}

export function shuffleList(array: any[]) {
  for (let i = array.length - 1; i > 0; --i) {
    let j = Math.floor(Math.random() * (i + 1));
    const c = array[j];
    array[j] = array[i];
    array[i] = c;
  }
}
