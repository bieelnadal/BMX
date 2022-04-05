import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/interfaces/Productos';


const URL = 'http://localhost:8080/';
const URL_CREAR_PRODUCTO='http://localhost:8080/productos/crearProductos.php';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  registrarProducto(Producto: Producto){
    console.log('producto dentro de service');
    console.log(Producto);
    
    return this.http.post(URL_CREAR_PRODUCTO, JSON.stringify(Producto)).subscribe((val: any) => {
        if (val.resultado == "error") {
          this.swalError();
        } else {
          this.swalCreado();
        }
      });

  }



  editarProducto(){

  }

  borrarProducto(){

  }


  swalCreado() {
    Swal.fire('Producto creado!', '¡Se ha creado el nuevo Producto!', 'success');
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    });
  }


}
