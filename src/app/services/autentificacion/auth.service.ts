import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { TokenSesionService } from '../tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';

const URL_LOGIN = 'https://bmx-bieelnadal.vercel.app/identificacion/login.php';
const URL_REGISTER = 'http://localhost:8080/identificacion/register.php';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private servicioToken: TokenSesionService
  ) {}

  login(usuario: Usuario) {
    return this.http
      .post(URL_LOGIN, JSON.stringify(usuario))
      .subscribe((val: any) => {
        if (val.resultado == "error") {
          this.swalError();
        } else {
          //guardar sesion funcion
          this.guardarSesion(val);
        }
      });
  }

  cerrarSesion() {
    this.servicioToken.cerrarSesion();
  }

  isAuthenticated(): boolean {
    if (this.servicioToken.getToken() != '') {
      return true;
    }
    return false;
  }

  rolUsuario() {
    const usuario = this.servicioToken.getUsuario();
    return usuario.id_admin;
  }

  register(usuario: Usuario) {
    this.http
      .post(URL_REGISTER, JSON.stringify(usuario))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          //tal tal
          this.swalError();
        } else {
          //funciona bien
          //guardar sesion
          this.guardarSesion(val);
        }
      });
  }

  guardarSesion(data: any) {
    //Sesion para usuario normal
    
    console.log(data.data.idAdmin);
    
    if (data.data.idAdmin == 0) {
      
      
      this.servicioToken.guardarToken(data.accessToken);
      this.servicioToken.guardarUsuario(data.data);
      this.router.navigate(['home']);
    }
    //Sesion para usuario administrador
    else {
      this.servicioToken.guardarToken(data.accessToken);
      this.servicioToken.guardarUsuario(data.data);
      this.router.navigate(['home']);
    }
  }

  swalError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    })
  }

}
