import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/usuarios/users.service';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // formulario
  registerForm!: FormGroup;

  // flags del formulario
  submitted: boolean = false;
  passShown: boolean = false;
  confirmPassShown: boolean = false;

  // para mostrar la contraseña introducida en el input
  passType: string = 'password';
  confirmPassType: string = 'password';

  // ngIf en caso de querer registrarnos como profesor
  //registroProfe: boolean = false;

  // input para acceder como profesor
  passAcceso: string = '';

  // avatar por defecto al registrarse
  imgSrc: string = '/assets/avatardefault.png';

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.crearForm();
    this.checkEmail();
    this.checkDni();
  }

  crearForm() {
    //Validadors registre
    this.registerForm = this.formBuilder.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        passcode: ['', [Validators.required, Validators.minLength(3)]],
        confirmPasscode: ['', Validators.required],
        dni: ['', [Validators.required, Validators.minLength(9)]],
        imagen: [''],
      },
      {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: this.mustMatch('passcode', 'confirmPasscode'),
      }
    );
  }
  // funció per controlar que camps password i confirmarpassword siguin iguals
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

  //Retorna els valors introduits al formulari
  get form() {
    return this.registerForm.controls;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get dni() {
    return this.registerForm.get('dni') as FormControl;
  }

  checkEmail() {
    this.email.valueChanges
      .pipe(
        debounceTime(200),
        tap((email) => {
          console.log('comprobando');
          if (email !== '' && this.email.invalid) {
            this.email.markAsPending({ emitEvent: true });
          } else {
            this.email.setErrors({ invalid: true });
          }
        })
      )
      .subscribe((email) => {
        this.usersService.validarEmailExiste(email).subscribe((val: any) => {
          if (val.resultado == 'error') {
            this.email.markAsPending({ onlySelf: false });
            this.email.setErrors({ notUnique: true });
          } else {
            this.email.markAsPending({ onlySelf: false });
            this.email.setErrors(null);
          }
        });
      });
  }

  checkDni() {
    this.dni.valueChanges
      .pipe(
        debounceTime(200),
        tap((dni) => {
          console.log('comprobando');
          if (dni !== '' && this.dni.invalid) {
            this.dni.markAsPending({ emitEvent: true });
          } else {
            this.dni.setErrors({ invalid: true });
          }
        })
      )
      .subscribe((dni) => {
        this.usersService.validarDniExiste(dni).subscribe((val: any) => {
          if (val.resultado == 'error') {
            this.dni.markAsPending({ onlySelf: false });
            this.dni.setErrors({ notUnique: true });
          } else {
            this.dni.markAsPending({ onlySelf: false });
            this.dni.setErrors(null);
          }
        });
      });
  }

  // Permitir visualizar la contraseña o no
  public togglePass() {
    if (this.passShown) {
      this.passShown = false;
      this.passType = 'password';
    } else {
      this.passShown = true;
      this.passType = 'text';
    }
  }

  // Permitir visualizar confirmar contraseña contraseña o no
  public toggleConfirmPass() {
    if (this.confirmPassShown) {
      this.confirmPassShown = false;
      this.confirmPassType = 'password';
    } else {
      this.confirmPassShown = true;
      this.confirmPassType = 'text';
    }
  }

  // Imagen
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  // Alerta sweetalert error
  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Existen campos incorrectos o incompletos!',
    });
  }

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;
    //Comprobar si es cumpleixen o no tots els errors
    if (this.registerForm.valid) {
      const nuevoUsuario: Usuario = {
        idUsuario: 0,
        Nombre: form.nombre,
        Apellidos: form.apellidos,
        Email: form.email,
        Passcode: form.passcode,
        idDireccion: 0,
        Imagen: this.imgSrc,
        DNI: form.dni,
        idAdmin: 0,
      };
      this.authService.register(nuevoUsuario);
      this.registerForm.reset();
    } else {
      this.swalError();
      console.log('No se ha podido registrar el usuario');
    }
  }
}
