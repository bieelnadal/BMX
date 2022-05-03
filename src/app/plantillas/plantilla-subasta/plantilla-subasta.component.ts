import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-plantilla-subasta',
  templateUrl: './plantilla-subasta.component.html',
  styleUrls: ['./plantilla-subasta.component.css']
})
export class PlantillaSubastaComponent implements OnInit {

  second:number = 1000;
  minute:number = this.second * 60;
  hour:number = this.minute * 60;
  day:number = this.hour * 24;
  end: any;
  now: any;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  constructor() { }

  ngOnInit(): void {

    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
      this.showDate();
    });

  }

  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this.day);
    this.hours = Math.floor((distance % this.day) / this.hour);
    this.minutes = Math.floor((distance % this.hour) / this.minute);
    this.seconds = Math.floor((distance % this.minute) / this.second);
  }

}
