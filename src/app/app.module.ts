import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { Deck } from './utils/deck';

@NgModule({
  declarations: [AppComponent, BoardComponent],
  imports: [BrowserModule],
  providers: [Deck],
  bootstrap: [AppComponent],
})
export class AppModule {}
