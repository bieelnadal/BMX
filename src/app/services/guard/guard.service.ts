import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../autentificacion/auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
