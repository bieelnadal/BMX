import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { UsersService } from 'src/app/services/usuarios/users.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent implements OnInit {
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

  listaUsuarios: any[] = [];
  usuario: any;

  constructor(
    private userServ: UsersService,
    private tokenServ: TokenSesionService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.listaUsuarios = [];
    this.userServ.obtenerUsuarios().subscribe((val: any) => {
      this.usuario = val;
      if (this.usuario == null) {
      } else {
        console.log('entra');

        val.forEach((element: any) => {
          console.log('entra for each');

          if (element.idUsuario != this.datosUsuario.idUsuario) {
            this.listaUsuarios.push(element);
            console.log(this.listaUsuarios);
          }
        });
      }
    });
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }
}
