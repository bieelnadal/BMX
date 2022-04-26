import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-usuarios',
  templateUrl: './borrar-usuarios.component.html',
  styleUrls: ['./borrar-usuarios.component.css']
})
export class BorrarUsuariosComponent implements OnInit {

  constructor(private usersServ: UsersService, private tokenServ: TokenSesionService) { }

  @Input() userSelecc: any;
  datosUsuario: any;

  ngOnInit(): void {
    this.recogerDatos();   
  }


  recogerDatos(){
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  enviar(){
    console.log(this.userSelecc);

    Swal.fire({
      title: '¿Estas seguro de que quieres borrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Borrar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: password } = await Swal.fire({
          title: 'Escribe tu contraseña',
          input: 'password',
          inputLabel: 'Contraseña',
          inputPlaceholder: 'Escribe tu contraseña',
        });
        if (password) {
          Swal.fire(`Escribir contraseña: ${password}`);

          if (password == this.datosUsuario.Passcode) {
            this.usersServ.borrarUsuario(this.userSelecc);
            Swal.fire({
              icon: 'success',
              title: 'Usuario borrado',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
            }).then((result) => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ooops..',
              text: 'No se ha podido borrar el usuario, la contraseña es incorrecta',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
            });
          }
        }
      }
    });

  }



}
