import { Injectable } from '@angular/core';
import { Direccion } from 'src/app/interfaces/Direccion';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const URL = 'http://localhost:8080/';

const URL_CREAR_DIRECCION =
  'http://localhost:8080/direcciones/crearDireccion.php';
const URL_MODIFICAR_DIRECCION =
  'http://localhost:8080/direcciones/modificarDireccion.php';
const URL_BORRAR_DIRECCION =
  'http://localhost:8080/direcciones/borrarDireccion.php';

const URL_LEER_DIRECCION =
  'http://localhost:8080/direcciones/obtenerDireccion.php';

@Injectable({
  providedIn: 'root',
})
export class DireccService {
  constructor(private http: HttpClient) {}

  registrarDireccion(direccion: Direccion) {
    this.http
      .post(URL_CREAR_DIRECCION, JSON.stringify(direccion))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          //tal tal
          this.swalError();
        } else {
          //funciona bien
          //guardar sesion
          this.swalCreado();
        }
      });
  }

  borrarDireccion(idDireccion: any) {
    console.log('Entra funcion');
    console.log(idDireccion);

    return this.http.delete(URL_BORRAR_DIRECCION+ `?idDireccion=${idDireccion}`).subscribe((val:any)=>{
      console.log(val);

    });
  }

  editarDireccion(){
    
  }

  //Obtener direcciones
  obtenerDirecciones() {
    return this.http.get(URL_LEER_DIRECCION);
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    });
  }

  swalCreado() {
    Swal.fire('¡Usuario creado!', '¡Se ha creado el nuevo usuario!', 'success');
  }
}
