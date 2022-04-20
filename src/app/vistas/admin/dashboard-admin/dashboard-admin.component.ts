import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { ProductsService } from 'src/app/services/productos/products.service';

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

  totalUsuarios: any;
  totalProductos: any;
  totalProductosSubasta: any;

  constructor(
    private usersService: UsersService,
    private tokenServ: TokenSesionService,
    private prodServ: ProductsService
  ) {}

  validarproductosVisual: boolean = false;
  gestionarusuariosVisual: boolean = false;

  ngOnInit() {
    this.obtenerDatos();
    this.contarUsuarios();
    this.contarProductos();
    this.contarProductosSubasta();
  }

  obtenerDatos(): any {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  contarUsuarios() {
    this.usersService.contarUsuarios().subscribe((val: any) => {
      this.totalUsuarios = val;
    });
  }

  contarProductos() {
    this.prodServ.contarProductos().subscribe((val: any) => {
      this.totalProductos = val;
    });
  }

  contarProductosSubasta() {
    this.prodServ.contarProductosSubasta().subscribe((val: any) => {
      this.totalProductosSubasta = val;
    });
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
