import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { Router } from '@angular/router';
import { DireccService } from 'src/app/services/direcciones/direcc.service';
import { Direccion } from 'src/app/interfaces/Direccion';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css'],
})
export class PerfilAdminComponent implements OnInit {
  datosUsuario: Usuario = {
    idUsuario: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Passcode: '',
    idDireccion: 0,
    Imagen: '',
    DNI: '',
    idAdmin: 1,
  };


  cojerDireccion:Direccion ={
    idDireccion: 0,
    Direccion: '',
    Pais: 0,
    Localidad: '',
    codigoPostal: 0,
    idUsuario: 0,
    Predeterminado:0,
  }

  direciones!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public fc: FormBuilder,
    private tokenServ: TokenSesionService,
    private authServ: AuthService,
    private router: Router,
    private direccService: DireccService,
  ) { }

  mostrarDesplegableVisual: boolean = false;
  mostrarDesplegableEditarPerfilVisual: boolean = false;
  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true;
  esconderPerfil: boolean = true;

  ngOnInit(): void {
    this.direciones = this.fc.group({
      direcion: ['', [Validators.required]],
      codigoPostal: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      localidad: ['', [Validators.required]],
    });
    this.obtenerDatos();

  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
    this.pasarIdUsuairoId();
  }

  pasarIdUsuairoId() {
    this.direccService.obtenerUsuarioId(this.datosUsuario.idUsuario).subscribe((val: any) => {
      this.cojerDireccion = val.data;

    });
  }



  cerrarSesion() {
    this.authServ.cerrarSesion();
    this.router.navigate(['login']);   
  }

  get form() {
    return this.direciones.controls;
  }

  onSubmit() { }

  mostrarDesplegableDireciones() {
    if (this.mostrarDesplegableVisual == false) {
      this.mostrarDesplegableVisual = true;
      this.mostrarDesplegableEditarPerfilVisual = false;
      this.esconderPerfil = false;
    } else {
      this.mostrarDesplegableVisual = false;
      this.esconderPerfil = true;
    }
  }

  mostrarDesplegableAgregarDirecion() {
    if (this.mostrarAgregarDirecion == false) {
      this.mostrarAgregarDirecion = true;
      this.esconderDirecion = false;
      this.esconderPerfil = false;
    } else {
      this.mostrarAgregarDirecion = false;
      this.esconderDirecion = true;
      this.esconderPerfil = false;
    }
  }

  mostrarDesplegableEditarPerfil() {
    if (this.mostrarDesplegableEditarPerfilVisual == false) {
      this.mostrarDesplegableEditarPerfilVisual = true;
      this.mostrarDesplegableVisual = false;
      this.esconderPerfil = false;
    } else {
      this.mostrarDesplegableEditarPerfilVisual = false;
      this.esconderPerfil = true;
    }
  }

  swalSalir() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Seguro que quieres cerrar la sesion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, si quiero!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Sesion Cerrada!', 'Hasta la proxima!!.', 'success');
        this.cerrarSesion();
      }
    });
  }
}
