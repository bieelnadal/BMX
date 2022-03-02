import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { TokenSesionService } from '../tokenSesion/token-sesion.service';

const URL_LOGIN = 'http://localhost:8080/identificacion/login.php';
const URL_REGISTER = 'http://localhost:8080/identificacion/register.php';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private servicioToken: TokenSesionService) {}

  login(usuario: Usuario) {
    return this.http
      .post(URL_LOGIN, JSON.stringify(usuario))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          console.log();
        } else {
          //guardar sesion funcion
        }
      });
  }

  cerrarSesion(){
    this.servicioToken.cerrarSesion();
  }

  rolUsuario(){
    const usuario = this.servicioToken.getUsuario();
    return usuario.id_admin;
  }

  register(usuario: Usuario){
    this.http.post(URL_REGISTER, JSON.stringify(usuario)).subscribe((val:any) => {
      if (val.resultado == 'error') {
        //tal tal
      }else{
        //funciona bien
        //guardar sesion
      }
    })
  }

  guardarSesion(data:any){
    //Sesion para usuario normal
    if (data.data.id_admin == 0) {
      this.servicioToken.guardarToken(data.accessToken);
      this.servicioToken.guardarUsuario(data.data);
      this.router.navigate(['home']);
    }
    //Sesion para usuario administrador
    else{
      this.servicioToken.guardarToken(data.accessToken);
      this.servicioToken.guardarUsuario(data.data);
      this.router.navigate(['home/admin'])
    }

  }
}
