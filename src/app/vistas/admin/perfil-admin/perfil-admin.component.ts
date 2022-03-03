import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

  constructor() { }

  mostrarDesplegableVisual: boolean = false;
  mostrarDesplegableEditarPerfilVisual: boolean = false;
  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true
  ngOnInit() {
  }




  mostrarDesplegableDireciones() {
    if(this.mostrarDesplegableVisual==false){
      this.mostrarDesplegableVisual=true;
      this.mostrarDesplegableEditarPerfilVisual=false;

    }else{
      this.mostrarDesplegableVisual=false;  
    }

  }

  mostrarDesplegableAgregarDirecion(){
    if(this.mostrarAgregarDirecion==false){
      this.mostrarAgregarDirecion=true;
      this.esconderDirecion=false;  

    }else{
      this.mostrarAgregarDirecion=false;  
      this.esconderDirecion=true;
    }
  }

  mostrarDesplegableEditarPerfil(){

    if(this.mostrarDesplegableEditarPerfilVisual==false){
      this.mostrarDesplegableEditarPerfilVisual=true;
      this.mostrarDesplegableVisual=false;
    }else{
      this.mostrarDesplegableEditarPerfilVisual=false;
    }
  }

}
