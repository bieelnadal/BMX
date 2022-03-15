import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  passShown: boolean = false;
  passType: string = 'password';

  submitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passcode: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onReset(){
    this.loginForm.reset();
  }

  onLogin(form: any) {
    const user: Usuario = {
      Email: form.email,
      Passcode: form.passcode,
      idUsuario: 0,
      Nombre: '',
      Apellidos: '',
      Imagen: '',
      DNI: '',
      idAdmin: 0,
      idDireccion: 0
    }
    this.submitted = true;
    
    if (this.loginForm.valid) {
      this.auth.login(user);
    }else{
      this.swalError();
    }
  }

  swalError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    })
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
}
