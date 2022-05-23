import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const URL = 'https://api-bmx.herokuapp.com/';

// URLS CREAR, LEER, EDITAR, BORRAR
const URL_REGISTRAR_USUARIO =
  'https://api-bmx.herokuapp.com/identificacion/register.php'; //URL REGISTRAR USUARIO
const URL_EMAIL_EXISTE = 'https://api-bmx.herokuapp.com/usuarios/emailExiste.php'; //URL EMAIL EXISTE
const URL_DNI_EXISTE = 'https://api-bmx.herokuapp.com/usuarios/dniExiste.php'; // URL COMPROBAR DNI EXISTE
const URL_PASS_EXISTE = 'https://api-bmx.herokuapp.com/usuarios/passcodeExiste.php'; //URL COMPROBAR CONTRASEÑA EXISTE
const URL_CONTAR_USER = 'https://api-bmx.herokuapp.com/usuarios/contarUsuarios.php'; //URL CONTAR USUARIO
const URL_VALIDAR_EMAIL =
  'https://api-bmx.herokuapp.com/usuarios/validarEmailExiste.php'; //URL VALIDAR EMAIL
const URL_MODIFICAR_USUARIO =
  'https://api-bmx.herokuapp.com/usuarios/modificarUsuario.php'; //URL UPDATE USUARIO

const URL_OBTENER_USUARIOS =
  'https://api-bmx.herokuapp.com/usuarios/obtenerUsuarios.php'; // OBTENER LOS USUARIOS

const URL_OBTENER_USUARIO_ID =
  'https://api-bmx.herokuapp.com/usuarios/obtenerUsuarioId.php';

const URL_BORRAR_USUARIO = 'https://api-bmx.herokuapp.com/usuarios/borrarUsuario.php';

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

  contarUsuarios() {
    return this.http.get(URL_CONTAR_USER);
  }

  obtenerUsuarioIdProducto(idUsuario: number) {
    return this.http.get(URL_VALIDAR_EMAIL + `?idUsuario=${idUsuario}`);
  }

  // Obtener todos los usuarios
  obtenerUsuarios() {
    return this.http.get(URL_OBTENER_USUARIOS);
  }

  validarDniExiste(dni: string) {
    return this.http.get(URL_DNI_EXISTE + `?DNI=${dni}`);
  }

  validarPasscode(pass: string, id: any) {
    var user = {
      Passcode: pass,
      idUsuario: id,
    };

    return this.http.post(URL_PASS_EXISTE, JSON.stringify(user));
  }

  borrarUsuario(idUsario: any) {
    console.log('Entra funcion');
    console.log(idUsario);

    return this.http
      .delete(URL_BORRAR_USUARIO + `?idUsuario=${idUsario}`)
      .subscribe((val: any) => {
        console.log(val);
      });
  }

  obtenerUsuarioId(idUsuario: any) {
    return this.http.get(URL_OBTENER_USUARIO_ID + `?idUsuario=${idUsuario}`);
  }

  validarEmail(email: string, id: any) {
    var user = {
      Email: email,
      idUsuario: id,
    };

    return this.http.post(URL_EMAIL_EXISTE, JSON.stringify(user));
  }

  modificarUsuario(usuario: Usuario) {
    console.log(usuario);

    return this.http.put(URL_MODIFICAR_USUARIO, JSON.stringify(usuario));
  }
}
