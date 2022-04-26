import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { UsersService } from 'src/app/services/usuarios/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-datos-usuario-modal',
  templateUrl: './editar-datos-usuario-modal.component.html',
  styleUrls: ['./editar-datos-usuario-modal.component.css'],
})
export class EditarDatosUsuarioModalComponent implements OnInit {
  modEditarUsuario!: FormGroup;

  submitted: boolean = false;
  modalClick: boolean = false;
  datosUsuarioSeleccionado: any;
  datosUsuario: any;

  passShown: boolean = false;
  confirmPassShown: boolean = false;

  passType: string = 'password';
  confirmPassType: string = 'password';

  imgSrc: string = '/assets/avatardefault.png';

  constructor(
    private modalService: NgbModal,
    private usersServ: UsersService,
    private formBuilder: FormBuilder,
    private tokenServ: TokenSesionService
  ) {}

  @Input() userSelecc: any;

  ngOnInit(): void {
    this.recogerDatos();
  }

  crearForm() {
    this.modEditarUsuario = this.formBuilder.group(
      {
        nombre: [this.datosUsuarioSeleccionado.Nombre, [Validators.required]],
        apellidos: [
          this.datosUsuarioSeleccionado.Apellidos,
          [Validators.required],
        ],
        email: [
          this.datosUsuarioSeleccionado.Email,
          [Validators.required, Validators.email],
        ],
        passcode: ['', [Validators.maxLength(50)]],
        confirmPasscode: [''],
        imagen: [''],
        dni: [
          this.datosUsuarioSeleccionado.DNI,
          [Validators.required, Validators.minLength(9)],
        ],
        idAdmin: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('passcode', 'confirmPasscode'),
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
    return this.modEditarUsuario.controls;
  }
  get email() {
    return this.modEditarUsuario.get('email') as FormControl;
  }

  checkEmail() {
    console.log(this.form.email.value);

    this.form.email.valueChanges.subscribe((email) => {
      if (
        email != '' &&
        this.datosUsuarioSeleccionado.Email != this.form.email.value
      ) {
        this.usersServ
          .validarEmail(email, this.datosUsuarioSeleccionado.idUsuario)
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

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  public togglePass() {
    if (this.passShown) {
      this.passShown = false;
      this.passType = 'password';
    } else {
      this.passShown = true;
      this.passType = 'text';
    }
  }

  public toggleConfirmPass() {
    if (this.confirmPassShown) {
      this.confirmPassShown = false;
      this.confirmPassType = 'password';
    } else {
      this.confirmPassShown = true;
      this.confirmPassType = 'text';
    }
  }

  enviar(modal: any) {
    console.log(this.datosUsuarioSeleccionado.Nombre);

    this.modalClick = true;
    this.modalService.open(modal);

    this.crearForm();
    this.checkEmail();
  }

  recogerDatos() {
    console.log(this.userSelecc);

    this.usersServ.obtenerUsuarioId(this.userSelecc).subscribe((val: any) => {
      this.datosUsuarioSeleccionado = val.data;
    });
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  onSubmit(form: any) {
    this.submitted = true;
    let newUser: Usuario;
    if (form.valid) {
      if (form.controls.passcode.value != '') {
        newUser = {
          idUsuario: this.datosUsuarioSeleccionado.idUsuario,
          Nombre: form.controls.nombre.value,
          Apellidos: form.controls.apellidos.value,
          Email: form.controls.email.value,
          Passcode: form.controls.passcode.value,
          Imagen: this.imgSrc,
          DNI: form.controls.dni.value,
          idAdmin: form.controls.idAdmin.value,
        };
      } else {
        console.log('No password valid');

        newUser = {
          idUsuario: this.datosUsuarioSeleccionado.idUsuario,
          Nombre: form.controls.nombre.value,
          Apellidos: form.controls.apellidos.value,
          Email: form.controls.email.value,
          Imagen: this.imgSrc,
          DNI: form.controls.dni.value,
          idAdmin: form.controls.idAdmin.value,
        };
      }
      this.confirmacionBorrar();
      this.usersServ.modificarUsuario(newUser).subscribe();
      console.log(newUser);

      //window.location.reload();
    } else {
      console.log(form.idAdmin);
      console.log('No es válido');
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  confirmacionBorrar() {
    Swal.fire({
      title: '¿Estas seguro de modificar los datos del usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Confirmar los cambios!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: password } = await Swal.fire({
          title: 'Escribe tu contraseña',
          input: 'password',
          inputLabel: 'Contraseña',
          inputPlaceholder: 'Escribe tu contraseña',
        });
        if (password) {
          Swal.fire(`Escribir contraseña: ${password}`);
          console.log(password);
          console.log(this.datosUsuario.Passcode);

          if (password == this.datosUsuario.Passcode) {
            Swal.fire({
              icon: 'success',
              title: 'Se modificaron los datos del usuario',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
            }).then((result) => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ooops..',
              text: 'No se ha modificado el usuario. La contraseña es incorrecta',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
            });
          }
        }
      }
    });
  }
}
