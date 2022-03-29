import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  opened = false;

  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor() { }

  ngOnInit(): void {
  }



}
