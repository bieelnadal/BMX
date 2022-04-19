import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  datosUsuario: Usuario = {
    idUsuario: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Passcode: '',
    idDireccion: 0,
    Imagen: '',
    DNI: '',
    idAdmin: 1,
  };

  usuario: any;
  listaUsuarios: any[] = [];

  constructor(
    private UsersService: UsersService,
    private tokenServ: TokenSesionService
  ) {}

  validarproductosVisual: boolean = false;
  gestionarusuariosVisual: boolean = false;
  contarUsuarios: any;
  ngOnInit() {
    this.obtenerDatos();
    this.obtenerUsuarios();
  }

  obtenerDatos(): any {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  obtenerUsuarios(){

  }

  mostrarValidarProductos() {
    if (this.validarproductosVisual == false) {
      this.validarproductosVisual = true;
      this.gestionarusuariosVisual = false;
    } else {
      this.validarproductosVisual = false;
    }
  }

  mostrarGestionProductos() {
    if (this.gestionarusuariosVisual == false) {
      this.gestionarusuariosVisual = true;
      this.validarproductosVisual = false;
    } else {
      this.gestionarusuariosVisual = false;
    }
  }

  swalPronto() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'En estos momentos no está disponible la opción escogida, por favor inténtalo más tarde!',
    });
  }
}
