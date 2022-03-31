import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { PAIS } from 'src/app/interfaces/Pais-mock';

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
  paises:any;
  selectedValue:any;

  mostrarAgregarDirecion: boolean = false;
  esconderDirecion: boolean = true;

  cambiarPais(e:any){
    console.log(e.target.value);
  }

  constructor(
    public fb: FormBuilder,
    private tokenServ: TokenSesionService,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.crearForm();
  }

  crearForm() {
    this.direcciones = this.fb.group({
      direcion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      codigoPostal: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
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
