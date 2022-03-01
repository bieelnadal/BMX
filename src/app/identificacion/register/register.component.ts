import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';

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
    public formBuilder: FormBuilder
  ) //private authService: AuthService
  {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    //Validadors registre
    this.registerForm = this.formBuilder.group(
      {
        id_usuario: [],
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
        passcode: ['', [Validators.required, Validators.minLength(6)]],
        confirmPasscode: ['', Validators.required],
        id_direccion: [''],
        dni: ['', [Validators.required, Validators.minLength(9)]],
        imagen: [''],
        id_admin: [''],
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

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;
    //Comprobar si es cumpleixen o no tots els errors
    if (this.registerForm.valid) {
      const nuevoProfesor: Usuario = {
        id_usuario: 0,
        nombre: form.username,
        apellidos: form.email,
        email: form.password,
        passcode: form.nombre,
        id_direccion: 0,
        imagen: this.imgSrc,
        dni: form.dni,
        id_admin: form.centro,
      };
      //this.authService.registroProfesor(nuevoProfesor);
    }else{
      console.log("hola");
      
    }
  }
}
