import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = ' auth-user';
const REFRESCAR_TOKEN = 'http://localhost:8080/tokenJWT/refrescarToken.php';

@Injectable({
  providedIn: 'root'
})
export class TokenSesionService {

  constructor(private jwtHelper:JwtHelperService, private http:HttpClient) { }

  cerrarSesion(): void{
    window.sessionStorage.clear();
    window.location.reload();
  }

  guardarToken(token:string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken():string{
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  guardarUsuario(usuario:any){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(usuario))
  }

  getUsuario(): any{
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '');
  }

  generarToken(){
    this.http.get(REFRESCAR_TOKEN);
  }
}
