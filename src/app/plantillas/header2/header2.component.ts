import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  mostrardesplegableVisual:boolean =false;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarMenu(){
    if(this.mostrardesplegableVisual==false){
        this.mostrardesplegableVisual=true;
    }else{
      this.mostrardesplegableVisual=false;
    }

  }

}
