import { Card } from '../models/card';
import { getOrderedDeck, shuffleList } from './utils';

export class Deck {
  private hiddenCards: Card[] = [];
  private visibleCards: Card[] = [];

  constructor() {
    this.shuffleAll();
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

  public drawsCard() {
    const drawedCard = this.hiddenCards.pop();
    if (!drawedCard) return;
    this.visibleCards.push(drawedCard);
    return drawedCard;
  }

  public printDeck() {
    console.log(this.hiddenCards);
    console.log(this.drawsCard());
    console.log(this.visibleCards, this.hiddenCards.length);
  }
}
