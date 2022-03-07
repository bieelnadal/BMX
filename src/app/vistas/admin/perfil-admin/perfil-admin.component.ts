import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

  EditarPefil: FormGroup;
  direciones: FormGroup;

  constructor(public fb: FormBuilder, public fc: FormBuilder) {
    this.EditarPefil = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      DNI: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
     this.direciones =this.fb.group({
       direcion: ['', [Validators.required,]],
       codigoPostal:['',[Validators.required]],
       Localidad:['' ,[Validators.required]],
     });
   }

  mostrarDesplegableVisual: boolean = false;
  mostrarDesplegableEditarPerfilVisual: boolean = false;
  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true
  ngOnInit() {
  }


  get form(){
    return this.EditarPefil.controls;
   }

   onSubmit() {   
    
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
