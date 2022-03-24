import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { UsersService } from '../../services/usuarios/users.service';

@Component({
  selector: 'app-editar-datos-usuario',
  templateUrl: './editar-datos-usuario.component.html',
  styleUrls: ['./editar-datos-usuario.component.css'],
})
export class EditarDatosUsuarioComponent implements OnInit {
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

  nombre: string = '';
  email: string = '';

  EditarPefil!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private tokenServ: TokenSesionService,
    private authServ: AuthService,
    private usersServ: UsersService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.crearFormPerfil();
    this.checkPass();
  }

  crearFormPerfil() {
    this.EditarPefil = this.fb.group(
      {
        inputNombre: [this.datosUsuario.Nombre],
        inputApellidos: [this.datosUsuario.Apellidos],
        inputEmail: [this.datosUsuario.Email],
        inputDNI: [this.datosUsuario.DNI],
        inputPasscode: [''],
        inputNewPasscode: [
          '',
          [Validators.minLength(6), Validators.maxLength(50)],
        ],
        inputConfirmNewPasscode: [''],
      },
      {
        validator: this.mustMatch(
          'inputNewPasscode',
          'inputConfirmNewPasscode'
        ),
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get form() {
    return this.EditarPefil.controls;
  }
  get oldPasscode() {
    return this.EditarPefil.get('inputPasscode') as FormControl;
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
    this.nombre = this.datosUsuario.Nombre;
    console.log(this.nombre);
  }

  onSubmit(form: any) {
    let usuarioMod: Usuario;
    if (form.valid) {
      if (form.controls.inputNewPasscode.value != '') {
        usuarioMod = {
          idUsuario: this.datosUsuario.idUsuario,
          Nombre: form.controls.inputNombre.value,
          Apellidos: form.controls.inputApellidos.value,
          Email: form.controls.inputEmail.value,
          Passcode: form.controls.inputNewPasscode.value,
          idDireccion: this.datosUsuario.idDireccion,
          Imagen: this.datosUsuario.Imagen,
          DNI: form.controls.inputDNI.value,
          idAdmin: this.datosUsuario.idAdmin,
        };
        console.log(usuarioMod);
      }
    }
  }

  checkPass() {
    this.form.inputPasscode.valueChanges.subscribe((oldPasscode) => {
      if (oldPasscode != '') {
        this.usersServ
          .validarPasscode(oldPasscode, this.datosUsuario.idUsuario)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              this.oldPasscode.setErrors({ notUnique: true });
            }
          });
      } else {
        this.oldPasscode.setErrors(null);
      }
    });
  }
}
