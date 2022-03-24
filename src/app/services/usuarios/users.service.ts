import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TokenSesionService } from '../tokenSesion/token-sesion.service';
import { Router } from '@angular/router';

const URL = 'http://localhost:8080/';

// URLS CREAR, LEER, EDITAR, BORRAR
const URL_REGISTRAR_USUARIO =
  'http://localhost:8080/identificacion/register.php'; //URL REGISTRAR USUARIO
// URL SELECCION EMAIL
const URL_EMAIL_EXISTE = 'http://localhost:8080/usuarios/emailExiste.php';
const URL_DNI_EXISTE = 'http://localhost:8080/usuarios/dniExiste.php';
const URL_PASS_USER_EXISTE = 'http://localhost:8080/usuarios/passcodeExiste.php';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  register(usuario: Usuario) {
    this.http
      .post(URL_REGISTRAR_USUARIO, JSON.stringify(usuario))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          //tal tal
          this.swalError();
        } else {
          //funciona bien
          //guardar sesion
          this.swalCreado();
        }
      });
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    });
  }
  swalCreado() {
    Swal.fire('¡Usuario creado!', '¡Se ha creado el nuevo usuario!', 'success');
  }

  validarEmailExiste(email: string) {
    return this.http.get(URL_EMAIL_EXISTE + `?Email=${email}`);
  }

  validarDniExiste(dni: string) {
    return this.http.get(URL_DNI_EXISTE + `?DNI=${dni}`);
  }

  validarPasscode(pass:string, id:number){
    var user = {
      "Passcode": pass,
      "idUsuario": id
    }    
    
    return this.http.post(URL_PASS_USER_EXISTE, JSON.stringify(user));
  }
}
