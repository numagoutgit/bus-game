import { Card } from '../models/card';

export class Deck {
  private hiddenCards: Card[];
  private visibleCards: Card[];

  constructor() {
    this.hiddenCards = [];
    this.visibleCards = [];
  }

  public printDeck() {
    console.log('Visible');
    console.log(this.visibleCards);
    console.log('Hidden');
    console.log(this.hiddenCards);
  }
}
