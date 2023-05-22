import { Card } from '../models/card';
import { getOrderedDeck, shuffleList } from './utils';

export class Deck {
  private hiddenCards: Card[] = [];
  private visibleCards: Card[] = [];

  constructor() {
    this.shuffleAll();
  }

  get length() {
    return this.hiddenCards.length;
  }

  public shuffleAll() {
    this.visibleCards = [];
    const orderedDeck = getOrderedDeck();
    shuffleList(orderedDeck);
    this.hiddenCards = orderedDeck;
  }

  public shuffleHidden() {
    shuffleList(this.hiddenCards);
  }

  public drawCard() {
    const drawedCard = this.hiddenCards.pop();
    if (!drawedCard) return;
    this.visibleCards.push(drawedCard);
    return drawedCard;
  }
}
