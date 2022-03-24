import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/usuarios/users.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private UsersService: UsersService) { }

  validarproductosVisual: boolean = false;
  gestionarusuariosVisual: boolean = false;
  contarUsuarios: any;
  ngOnInit() {
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
      this.gestionarusuariosVisual = false
    }
  }


  swal() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'En estos momentos no está disponible la opción escogida, por favor inténtalo más tarde!',
    })
  }


  obtenerDatos():any {
    this.UsersService.contarUsuariosRegistrados().subscribe(val => this.contarUsuarios = val);
    console.log(this.contarUsuarios);


  }

}
