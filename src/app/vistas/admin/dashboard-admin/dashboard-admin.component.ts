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

  flagGP:boolean = false;
  flagGU:boolean = false;

  productosNoVerificados: any;

  totalUsuarios: any;
  totalProductos: any;
  totalProductosSubasta: any;

  constructor(
    private usersService: UsersService,
    private tokenServ: TokenSesionService,
    private prodServ: ProductsService
  ) {}

  gestionProductosVisual: boolean = false;
  gestionUsuariosVisual: boolean = false;
  gestionVerificacionProductos: boolean = false;

  ngOnInit() {
    this.obtenerDatos();
    this.contarUsuarios();
    this.contarProductos();
    this.contarProductosSubasta();
    this.contarProductosSinVerificar();
  }

  obtenerDatos(): any {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  contarUsuarios() {
    this.usersService.contarUsuarios().subscribe((val: any) => {
      this.totalUsuarios = val;
    });
  }

  contarProductosSinVerificar(){
    this.prodServ.contarProductosSinVerificar().subscribe((val: any) => {
      this.productosNoVerificados = val;
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
    
    if (this.gestionProductosVisual == false) {
      this.gestionProductosVisual = true;
      this.gestionUsuariosVisual = false;
      this.gestionVerificacionProductos = false;
      this.flagGP = true;
    } else {
      this.gestionProductosVisual = false;
      this.flagGP = false;
    }
  }

  mostrarGestionProductos() {
    if (this.gestionUsuariosVisual == false) {
      this.gestionUsuariosVisual = true;
      this.gestionProductosVisual = false;
      this.gestionVerificacionProductos = false;
      this.flagGU = true;
      this.flagGP = false;
    } else {
      this.gestionUsuariosVisual = false;
      this.flagGU = false;
    }
  }

  mostrarTablaVerificacionProductos() {
    if (this.gestionVerificacionProductos == false) {
      this.gestionVerificacionProductos = true;
      this.gestionUsuariosVisual = false;
      this.gestionProductosVisual = false;
      this.flagGU = false;
      this.flagGP = true;
    } else {
      this.gestionVerificacionProductos = false;
      this.flagGP = false;
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
