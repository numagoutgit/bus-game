import { Component, OnInit } from '@angular/core';
import { Card, cardComparison } from 'src/app/models/card';
import { Deck } from 'src/app/utils/deck';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public hiddenCards: Card[][] = [[], [], []];
  public visibleCards: Card[][] = [[], [], []];
  public currentStep = 0;

  constructor(private deck: Deck) {}

  ngOnInit(): void {
    this.hiddenCards = [[], [], []];
    this.visibleCards = [[], [], []];
    for (let i = 0; i < 3; ++i) {
      this.hiddenCards[i].push(this.drawCard() as Card);
      this.visibleCards[i].push(this.drawCard() as Card);
    }
  }

  private playVisible(drawedCard: Card, step: number, order: number) {
    const lastCard = this.visibleCards[step].slice(-1)[0];
    this.visibleCards[step].push(drawedCard);
    this.currentStep =
      cardComparison(drawedCard, lastCard) === order ? this.currentStep + 1 : 0;
  }

  private playHidden(drawedCard: Card, step: number, order: number) {
    const lastCard = this.hiddenCards[step].slice(-1)[0];
    this.hiddenCards[step].push(drawedCard);
    if (cardComparison(drawedCard, lastCard) === order) {
      ++this.currentStep;
    } else {
      this.currentStep = 0;
      for (let i = 0; i <= step; ++i) {
        const hiddenCard = this.drawCard();
        if (!hiddenCard) return;
        this.hiddenCards[i].push(hiddenCard);
      }
    }
  }

  private drawCard() {
    const drawedCard = this.deck.drawCard();
    if (!drawedCard) this.triggerDefeat();
    return drawedCard;
  }

  private play(order: number) {
    const drawedCard = this.drawCard();
    if (!drawedCard) return;
    if (this.currentStep < 3) {
      this.playVisible(drawedCard, this.currentStep, order);
    } else {
      this.playHidden(drawedCard, this.currentStep - 3, order);
    }
    if (this.currentStep === 6) this.triggerVictory();
  }

  private triggerVictory() {
    console.log('Victory Bro');
    this.deck.shuffleAll();
    this.ngOnInit();
  }

  private triggerDefeat() {
    console.log('Defeat bro');
    this.deck.shuffleAll();
    this.ngOnInit();
  }

  public chooseLess() {
    this.play(-1);
  }

  public chooseEqual() {
    this.play(0);
  }

  public chooseMore() {
    this.play(1);
  }
}
