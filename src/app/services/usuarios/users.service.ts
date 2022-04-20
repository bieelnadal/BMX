import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const URL = 'http://localhost:8080/';

// URLS CREAR, LEER, EDITAR, BORRAR
const URL_REGISTRAR_USUARIO ='http://localhost:8080/identificacion/register.php'; //URL REGISTRAR USUARIO
const URL_EMAIL_EXISTE = 'http://localhost:8080/usuarios/emailExiste.php';  //URL EMAIL EXISTE
const URL_DNI_EXISTE = 'http://localhost:8080/usuarios/dniExiste.php';  // URL COMPROBAR DNI EXISTE
const URL_PASS_EXISTE = 'http://localhost:8080/usuarios/passcodeExiste.php'; //URL COMPROBAR CONTRASEÑA EXISTE
const URL_CONTAR_USER= 'http://localhost:8080/usuarios/contarUsuarios.php';  //URL CONTAR USUARIO
const URL_VALIDAR_EMAIL = 'http://localhost:8080/usuarios/validarEmailExiste.php';  //URL VALIDAR EMAIL
const URL_MODIFICAR_USUARIO = 'http://localhost:8080/usuarios/modificarUsuario.php'; //URL UPDATE USUARIO

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
    return this.http.get(URL_VALIDAR_EMAIL + `?Email=${email}`);
  }

  contarUsuarios(){
    return this.http.get(URL_CONTAR_USER);
  }

  validarDniExiste(dni: string) {
    return this.http.get(URL_DNI_EXISTE + `?DNI=${dni}`);
  }

  validarPasscode(pass:string, id:any){
    var user = {
      "Passcode": pass,
      "idUsuario": id
    }    
    
    return this.http.post(URL_PASS_EXISTE, JSON.stringify(user));
  }

  validarEmail(email:string, id:any){
    var user = {
      "Email": email,
      "idUsuario": id
    }    
    
    return this.http.post(URL_EMAIL_EXISTE, JSON.stringify(user));
  }

  modificarUsuario(usuario: Usuario){
    return this.http.put(URL_MODIFICAR_USUARIO, JSON.stringify(usuario));
  }
}
