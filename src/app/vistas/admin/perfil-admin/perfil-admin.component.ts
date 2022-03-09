import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

  EditarPefil!: FormGroup;
  direciones!: FormGroup;

  constructor(public fb: FormBuilder, public fc: FormBuilder) {}

  mostrarDesplegableVisual: boolean = false;
  mostrarDesplegableEditarPerfilVisual: boolean = false;
  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true;
  esconderPerfil: boolean = true

  ngOnInit() {
    this.EditarPefil = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      DNI: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
     this.direciones =this.fc.group({
       direcion: ['', [Validators.required,]],
       codigoPostal:['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
       localidad:['' ,[Validators.required]],
     });
  }


  get form(){
    return this.EditarPefil.controls;
    return this.direciones.controls;
   }

   onSubmit() {   
    
  }



  mostrarDesplegableDireciones() {
    if(this.mostrarDesplegableVisual==false){
      this.mostrarDesplegableVisual=true;
      this.mostrarDesplegableEditarPerfilVisual=false;
      this.esconderPerfil=false

    }else{
      this.mostrarDesplegableVisual=false;  
      this.esconderPerfil=true

    }

  }

  mostrarDesplegableAgregarDirecion(){
    if(this.mostrarAgregarDirecion==false){
      this.mostrarAgregarDirecion=true;
      this.esconderDirecion=false;  
      this.esconderPerfil=false;

    }else{
      this.mostrarAgregarDirecion=false;  
      this.esconderDirecion=true;
      this.esconderPerfil=false;
    }
  }

  mostrarDesplegableEditarPerfil(){

    if(this.mostrarDesplegableEditarPerfilVisual==false){
      this.mostrarDesplegableEditarPerfilVisual=true;
      this.mostrarDesplegableVisual=false;
      this.esconderPerfil=false
    }else{
      this.mostrarDesplegableEditarPerfilVisual=false;
      this.esconderPerfil=true;
    }
  }

  swalsalir(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Seguro que quieres cerrar la sesion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, si quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesion Cerrada!',
          'Hasta la proxima!!.',
          'success'
        )
      }
    })
  }




}

