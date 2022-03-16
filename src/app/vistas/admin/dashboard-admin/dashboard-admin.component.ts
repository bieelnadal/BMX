import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor() { }

  validarproductosVisual:boolean =false;

  ngOnInit() {
  }

  mostrarValidarProductos(){
    if (this.validarproductosVisual=false) {
        this.validarproductosVisual=true;
    }else{
      this.validarproductosVisual=false;
    }
  }
}
