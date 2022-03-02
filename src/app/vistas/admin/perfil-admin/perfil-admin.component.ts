import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

  constructor() { }

  mostrarDesplegableVisual: boolean = false;
  mostrarAgregarDirecion: boolean = false;
  ngOnInit() {
  }




  mostrarDesplegableDireciones() {
    if(this.mostrarDesplegableVisual==false){
      this.mostrarDesplegableVisual=true;

    }else{
      this.mostrarDesplegableVisual=false;  
    }

  }

  mostrarDesplegableAgregarDirecion(){
    if(this.mostrarAgregarDirecion==false){
      this.mostrarAgregarDirecion=true;

    }else{
      this.mostrarAgregarDirecion=false;  
    }
  }

}
