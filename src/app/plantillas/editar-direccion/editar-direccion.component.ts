import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { DireccService } from 'src/app/services/direcciones/direcc.service';
import { Direccion } from '../../interfaces/Direccion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.css'],
})
export class EditarDireccionComponent implements OnInit {
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

  direcciones!: FormGroup;
  idUsuario: number = 0;

  direccion: any;
  listaDirecciones: any[] = [];

  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true;
  mostrarCampoRestante: boolean = false;

  constructor(
    public fb: FormBuilder,
    private tokenServ: TokenSesionService,
    private direccService: DireccService
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerDirecciones();
    this.crearForm();
  }

  crearForm() {
    this.direcciones = this.fb.group({
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      codigoPostal: [
        '',
        [Validators.required, Validators.maxLength(5)],
      ],
      localidad: ['', [Validators.required]],
    });
  }

  get form() {
    return this.direcciones.controls;
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  obtenerDirecciones() {
    this.listaDirecciones = [];
    this.direccService.obtenerDirecciones().subscribe((val: any) => {
      this.direccion = val;
      if (this.direccion == null) {
      } else {
        console.log('entra');

        val.forEach((element: any) => {
          console.log('entra for each');

          if (element.idUsuario == this.datosUsuario.idUsuario) {
            this.listaDirecciones.push(element);
            console.log(this.listaDirecciones);
          }
        });
      }
    });
  }

  direccPredeterminada(direccion: Direccion) {
    Swal.fire({
      title: '¿Quieres hacer de esta tu dirección predeterminada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Establecer Predeterminada!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.direccService.editarPredeterminado(direccion);
        Swal.fire(
          '¡Dirección actualizada!',
          'Tu dirección predeterminada ha sido cambiada con éxito.',
          'success'

        ).then((result) => {
          window.location.reload();
        });


      }
    });
  }

  onSubmit(form: any) {
    this.mostrarCampoRestante = true;
    if (this.direcciones.valid) {
      const nuevaDireccion: Direccion = {
        idDireccion: 0,
        Direccion: form.direccion,
        Pais: form.pais,
        Localidad: form.localidad,
        codigoPostal: form.codigoPostal,
        idUsuario: this.datosUsuario.idUsuario,
        Predeterminado: 0,
      };
      this.direccService.registrarDireccion(nuevaDireccion);
      this.direcciones.reset();
      window.location.reload();
    }

  }

  borrarDireccion(idDirecc: any) {
    console.log(idDirecc);
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No vas a poder revertir el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.direccService.borrarDireccion(idDirecc);
        Swal.fire(
          '¡Dirección borrada!',
          'La dirección ha sido borrado con éxito.',
          'success'
        ).then((result) => {
          window.location.reload();
        });


      }
    });
  }

  mostrarDesplegableAgregarDirecion() {
    if (this.mostrarAgregarDirecion == false) {
      this.mostrarAgregarDirecion = true;
      this.esconderDirecion = false;
    } else {
      this.mostrarAgregarDirecion = false;
      this.esconderDirecion = true;
    }
  }
}
