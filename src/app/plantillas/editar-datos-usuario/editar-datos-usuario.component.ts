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

  editar:boolean = false;

  // nombre: string = 'adfas';
  // email: string = '';

  EditarPefil!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private tokenServ: TokenSesionService,
    private usersServ: UsersService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.crearFormPerfil();
    this.checkPass();
    this.checkEmail();
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
          [Validators.minLength(3), Validators.maxLength(50)],
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

  get email() {
    return this.EditarPefil.get('inputEmail') as FormControl;
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
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
      } else{
        usuarioMod = {
          idUsuario: this.datosUsuario.idUsuario,
          Nombre: form.controls.inputNombre.value,
          Apellidos: form.controls.inputApellidos.value,
          Email: form.controls.inputEmail.value,
          idDireccion: this.datosUsuario.idDireccion,
          Imagen: this.datosUsuario.Imagen,
          DNI: form.controls.inputDNI.value,
          idAdmin: this.datosUsuario.idAdmin,
        };
      }
      Swal.fire({
        title: '¿Quiéres guardar los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: 'Se han guardaron los cambios',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.usersServ.modificarUsuario(usuarioMod).subscribe((val: any) => {
              this.tokenServ.guardarUsuario(val.data);
              this.obtenerDatos();
              window.location.reload();
            });
          });
        }
      });
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

  checkEmail() {
    this.form.inputEmail.valueChanges.subscribe((email) => {
      if (email != '' && this.datosUsuario.Email!=this.form.inputEmail.value) {
        this.usersServ
          .validarEmail(email, this.datosUsuario.idUsuario)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              this.email.setErrors({ notUnique: true });
            }
          });
      } else {
        this.email.setErrors(null);
      }
    });
  }

  modificarForm(){
    if (this.editar==false) {
      this.editar=true;
    }else{
      this.editar=false;
      this.EditarPefil.reset();
      this.EditarPefil.get('inputNombre')?.setValue(this.datosUsuario.Nombre);
      this.EditarPefil.get('inputApellidos')?.setValue(this.datosUsuario.Apellidos);
      this.EditarPefil.get('inputEmail')?.setValue(this.datosUsuario.Email);
      this.EditarPefil.get('inputDNI')?.setValue(this.datosUsuario.DNI);
    }
  }
}
