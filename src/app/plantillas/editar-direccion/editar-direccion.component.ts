import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';

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

  direciones!: FormGroup;

  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true;

  constructor(
    public fb: FormBuilder,
    public fc: FormBuilder,
    private tokenServ: TokenSesionService,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.obtenerDatos();
  }

  crearForm() {
    this.direciones = this.fc.group({
      direcion: ['', [Validators.required]],
      codigoPostal: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      localidad: ['', [Validators.required]],
    });
  }

  get form() {
    return this.direciones.controls;
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  onSubmit() {}

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
