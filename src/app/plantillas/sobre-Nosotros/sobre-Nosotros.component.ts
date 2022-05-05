import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-Nosotros',
  templateUrl: './sobre-Nosotros.component.html',
  styleUrls: ['./sobre-Nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

}
