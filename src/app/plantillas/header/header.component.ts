import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  datosUsuario: Usuario = {
    idUsuario: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Passcode: '',
    idDireccion: 0,
    Imagen: '',
    DNI: '',
    idAdmin: 0,
  };

  lang:any;
  
  constructor(
    private tokenServ: TokenSesionService,
    private authServ: AuthService,
    private router: Router,
    private transaleServ: TranslateService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.lang = localStorage.getItem('lang') || 'es';
  }
  cerrarSesion() {
    this.authServ.cerrarSesion();
    this.router.navigate(['login']);   
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();

  }
  swalSalir() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Seguro que quieres cerrar la sesion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, si quiero!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Sesion Cerrada!', 'Hasta la proxima!!.', 'success');
        this.cerrarSesion();
      }
    });
  }

  changeLang(lang:any){
    console.log(lang.target.value);
    localStorage.setItem('lang', lang.target.value);
    window.location.reload();
  }
}
