import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../autentificacion/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.swal();
   //   this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  swal(){
    Swal.fire({
      icon: 'error',
      title: '¡ No puedes acceder a esta pagina !',
      text: 'Para acceder debes iniciar sesión o Registrase.',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Iniciar sesión',
      denyButtonText: `Registrase`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['login']);
      } else if (result.isDenied) {
        this.router.navigate(['register']);
      }
    })
  }
}
