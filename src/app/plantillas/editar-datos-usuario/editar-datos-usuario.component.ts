import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  nombre: string = 'afas';

  EditarPefil!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public fc: FormBuilder,
    private tokenServ: TokenSesionService,
    private authServ: AuthService,
    private usersServ: UsersService,
  ) {}

  ngOnInit(): void {
    this.crearFormPerfil();
    this.obtenerDatos();
    this.checkPass();
  }

  crearFormPerfil() {
    this.EditarPefil = this.fb.group(
      {
        nombre: [this.datosUsuario.Nombre],
        apellidos: [this.datosUsuario.Apellidos],
        email: [this.datosUsuario.Email],
        DNI: [
          this.datosUsuario.DNI,
          [Validators.minLength(9), Validators.maxLength(9)],
        ],
        oldPasscode: [''],
        newPasscode: ['', [Validators.minLength(6), Validators.maxLength(50)]],
        confirmNewPasscode: [''],
      },
      {
        validator: this.mustMatch('newPasscode', 'confirmNewPasscode'),
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

  get passForm() {
    return this.EditarPefil.get('oldPasscode') as FormControl;
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
   
  }


  onSubmit(form: any) {
    let usuarioMod: Usuario;
    if (form.valid) {
      if (form.controls.newPasscode.value != '') {
        usuarioMod = {
          idUsuario: this.datosUsuario.idUsuario,
          Nombre: form.controls.nombre.value,
          Apellidos: form.controls.apellidos.value,
          Email: form.controls.email.value,
          Passcode: form.controls.newPasscode.value,
          idDireccion: this.datosUsuario.idDireccion,
          Imagen: this.datosUsuario.Imagen,
          DNI: form.controls.DNI.value,
          idAdmin: this.datosUsuario.idAdmin,
        };
      }
    }
  }


  checkPass() {
    this.form.oldPasscode.valueChanges.subscribe((passForm) => {
      if (passForm != '') {
        this.usersServ.validarPasscode(passForm, this.datosUsuario.idUsuario).subscribe((val: any) => {
          if (val.resultado == 'error') {
            this.passForm.setErrors({ notUnique: true });
          }
        });
      } else {
        this.passForm.setErrors(null);
      }
    });
  }
}
