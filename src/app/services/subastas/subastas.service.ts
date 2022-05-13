import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subasta } from 'src/app/interfaces/Subastas';
import { Producto } from '../../interfaces/Productos';
import { Puja } from 'src/app/interfaces/Puja';

const URL_CREAR_SUBASTA = 'http://localhost:8080/subastas/crearSubasta.php';

const URL_OBTENER_SUBASTAS =
  'http://localhost:8080/subastas/obtenerSubastas.php';

const URL_OBTENER_SUBASTA_PRODUCTO_ID =
  'http://localhost:8080/subastas/obtenerSubastaProductoId.php';

const URL_BORRAR_SUBASTA = 'http://localhost:8080/subastas/borrarSubasta.php';

const URL_CREAR_PRODUCTO = 'http://localhost:8080/productos/crearProductos.php';

const URL_CREAR_PUJA = 'http://localhost:8080/subastas/crearPuja.php';

const URL_OBTENER_PUJAS = 'http://localhost:8080/subastas/obtenerPujas.php';

const URL_EDITAR_SUBASTA ="http://localhost:8080/subastas/editarSubasta.php";

const URL_GANADOR_SUBASTA = "http://localhost:8080/subastas/ganadorSubasta.php";


@Injectable({
  providedIn: 'root',
})
export class SubastasService {
  idProducto: any;
  constructor(private http: HttpClient) { }

  crearSubasta(Producto: Producto, Subasta: Subasta) {
    console.log('esta');

    this.http
      .post(URL_CREAR_PRODUCTO, JSON.stringify(Producto))
      .subscribe((val: any) => {
        this.idProducto = val.data;
        console.log(this.idProducto[0]);

        Subasta.idProducto = this.idProducto[0];
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

  editarSubasta(subasta: Subasta) {
    console.log(subasta);

    return this.http.put(URL_EDITAR_SUBASTA, JSON.stringify(subasta));
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

    return this.http.get(
      URL_OBTENER_SUBASTA_PRODUCTO_ID + `?idProducto=${idProducto}`
    );
  }

  obtenerPujas(idSubasta: any) {
    return this.http.get(URL_OBTENER_PUJAS + `?idSubasta=${idSubasta}`);
  }

  crearPuja(Puja: Puja) {

    return this.http
      .post(URL_CREAR_PUJA, JSON.stringify(Puja))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          this.swalError();
        } else {
          this.swalPuja();

        }
      });
      
  }

  subirGanador(idSubasta:any, idProducto:any){
    
    return this.http.get(URL_GANADOR_SUBASTA + `?idSubasta=${idSubasta}&idProducto=${idProducto}`);
  }


  swalPuja() {
    Swal.fire(
      'Producto creado!',
      '¡Se ha registrado tu puja!',
      'success'
    ).then((result) => {
      window.location.reload();
    });
  }

  swalCreado() {
    Swal.fire(
      'Producto creado!',
      '¡La subasta ha empezado!',
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
    });
  }
}
