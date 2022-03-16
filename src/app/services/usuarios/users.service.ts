import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:8080/';

// URLS CREAR, LEER, EDITAR, BORRAR

// URL SELECCION EMAIL
const URL_EMAIL_EXISTE = 'http://localhost:8080/usuarios/emailExiste.php';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  validarEmailExisteAlumnos(email: string) {
    return this.http.get(URL_EMAIL_EXISTE + `?email=${email}`);
  }
}
