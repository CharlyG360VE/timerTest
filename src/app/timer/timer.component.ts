import {Component, Input, OnInit} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit {

  @Input() initial: number;
  stopTimer = true;
  timer$ = interval( 1000 );
  value$: Subscription[] = [];

  ngOnInit() {
    this.startDecreased();
  }

  startDecreased() {
    this.value$.push( this.timer$.subscribe( () => {
      this.initial = this.initial - 1;
      if ( this.initial === 0 ) {
        this.stopDecreased();
      }
    } ) );
    this.stopTimer = true;
  }

  stopDecreased() {
    this.value$.forEach( subs => subs.unsubscribe() );
    this.stopTimer = false;
  }

}
