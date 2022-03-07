import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { AuthService } from 'src/app/services/autentificacion/auth.service';

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

  onLogin(form: any) {
    const user: Usuario = {
      email: form.email,
      passcode: form.passcode,
    };
    console.log(this.submitted);
    console.log(this.form.passcode.errors);
    this.submitted = true;
    console.log(this.submitted);
    console.log(this.form.passcode.errors);
    
    if (this.loginForm.valid) {
      this.auth.login(user);
    }
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
