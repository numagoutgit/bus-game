import { Component } from '@angular/core';
import { Deck } from 'src/app/utils/deck';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(private deck: Deck) {}

  public printDeck() {
    this.deck.printDeck();
  }
}
