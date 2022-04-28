import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { UsersService } from 'src/app/services/usuarios/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.css']
})
export class BorrarProductoComponent implements OnInit {

  constructor(private usersServ: UsersService, private tokenServ: TokenSesionService, private prodServ: ProductsService) { }

  @Input() prodSelecc: any;
  datosUsuario: any;

  ngOnInit(): void {
    this.recogerDatos();   
  }


  recogerDatos(){
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  enviar(){
    console.log(this.prodSelecc);

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
            this.usersServ.borrarUsuario(this.prodSelecc);
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
