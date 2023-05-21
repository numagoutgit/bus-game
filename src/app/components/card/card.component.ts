import { Component, Input } from '@angular/core';
import { Card, Sign } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() hidden: boolean = false;
  @Input() card: Card = { number: 1, sign: Sign.DIAMONDS };
}
