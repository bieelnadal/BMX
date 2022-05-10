import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subasta } from 'src/app/interfaces/Subastas';
import { LoginComponent } from 'src/app/identificacion/login/login.component';
import { Producto } from '../../interfaces/Productos';

const URL = 'http://localhost:8080/';

const URL_CREAR_SUBASTA = 'http://localhost:8080/subastas/crearSubasta.php';

const URL_OBTENER_SUBASTAS =
  'http://localhost:8080/subastas/obtenerSubastas.php';

const URL_OBTENER_COMPRADOR_ID =
  'http://localhost:8080/subastas/obtenerCompradorId.php';

const URL_OBTENER_SUBASTA_ID =
  'http://localhost:8080/subastas/obtenerSubastaId.php';

const URL_OBTENER_SUBASTAS_ADMIN =
  'http://localhost:8080/subastas/obtenerSubastaAdmin.php';

const URL_OBTENER_SUBASTA_PRODUCTO_ID = 'http://localhost:8080/subastas/obtenerSubastaProductoId.php';

const URL_BORRAR_SUBASTA = 'http://localhost:8080/subastas/borrarSubasta.php';

const URL_EDITAR_SUBASTA = 'http://localhost:8080/subastas/editarProductos.php';

const URL_HISTORIAL_PUJAS = 'http://localhost:8080/subastas/historialPujas.php';

const URL_CREAR_PRODUCTO = 'http://localhost:8080/productos/crearProductos.php';

@Injectable({
  providedIn: 'root',
})
export class SubastasService {
  idProducto: any;
  constructor(private http: HttpClient) {}

  crearSubasta(Producto: Producto, Subasta: Subasta) {
    console.log('esta');

    this.http
      .post(URL_CREAR_PRODUCTO, JSON.stringify(Producto))
      .subscribe((val: any) => {
        this.idProducto = val.data;
        console.log(this.idProducto[0]);

        Subasta.idProducto=this.idProducto[0];
        console.log(Subasta);
        
        //
        this.http
          .post(URL_CREAR_SUBASTA, JSON.stringify(Subasta))
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              this.swalError();
            } else {
              this.swalCreado();
            }
          });
      });
  }

  editarSubasta(Subasta: Subasta) {
    return this.http.put(URL_EDITAR_SUBASTA, JSON.stringify(Subasta));
  }

  obtenerProducto() {
    return this.http.get(URL_OBTENER_SUBASTAS);
  }

  borrarSubasta(idSubasta: any) {
    return this.http
      .delete(URL_BORRAR_SUBASTA + `?idSubasta=${idSubasta}`)
      .subscribe((val: any) => {
        console.log(val);
      });
  }

  obtenerSubastaProductoId(idProducto: any) {
    console.log(idProducto);
    
    return this.http.get(
      URL_OBTENER_SUBASTA_PRODUCTO_ID + `?idProducto=${idProducto}`
    );
  }

  obtenerComprador() {}

  swalCreado() {
    Swal.fire(
      'Producto creado!',
      '¡Se ha creado el nuevo Producto!',
      'success'
    ).then((result) => {
      window.location.reload();
    });
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    }).then((result) => {
      window.location.reload();
    });;
  }
}
