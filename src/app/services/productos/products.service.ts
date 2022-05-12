import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/interfaces/Productos';
import { Carrito } from 'src/app/interfaces/Carrito';
import { LoginComponent } from 'src/app/identificacion/login/login.component';

const URL = 'http://localhost:8080/';

const URL_CREAR_PRODUCTO = 'http://localhost:8080/productos/crearProductos.php';

const URL_CREAR_CARRITO = 'http://localhost:8080/productos/tramitesCarrito.php';

const URL_OBTENER_PRODUCTO =
  'http://localhost:8080/productos/obtenerProductos.php';

const URL_CONTAR_PRODUCTOS =
  'http://localhost:8080/productos/contarProductos.php';

const URL_CONTAR_PRODUCTOS_SUBASTA =
  'http://localhost:8080/productos/contarProductosSubasta.php';

const URL_OBTENER_PRODUCTO_ID =
  'http://localhost:8080/productos/obtenerProductoId.php';

const URL_OBTENER_VENDEDOR_ID =
  'http://localhost:8080/productos/obtenerVendedorId.php';

const URL_CAMBIAR_ESTADO_PRODUCTO =
  'http://localhost:8080/productos/cambiarEstado.php';

const URL_CONTAR_PRODUCTOS_SIN_VERIFICAR =
  'http://localhost:8080/productos/contarProductosSinVerificar.php';

const URL_OBTENER_PRODUCTO_ADMIN =
  'http://localhost:8080/productos/obtenerProductosAdmin.php';

const URL_HISTORIAL_VENTAS_ID =
  'http://localhost:8080/productos/historialVentasPorId.php';

const URL_BORRAR_PRODUCTO =
  'http://localhost:8080/productos/borrarProducto.php';

const URL_EDITAR_PRODUCTO =
  'http://localhost:8080/productos/editarProducto.php';

const URL_OBTENER_VENDEDOR_INFO ="http://localhost:8080/productos/obtenerVendedorInfo.php";

const URL_OBTENER_DIRECCION ="http://localhost:8080/productos/obtenerDireccionCarrito.php";

const URL_OBTENER_PRODUCTOS_VALIDAR ="http://localhost:8080/productos/obtenerProductosValidacion.php";

const URL_VALIDAR_PRODUCTO = "http://localhost:8080/productos/validarProducto.php";

const URL_HISTORIAL_VENTAS = "http://localhost:8080/productos/historialVentas.php";

const URL_PRINTAR_PRODUCTOS_ID ="http://localhost:8080/productos/printarProductosId.php";

const URL_OBTENER_SUBASTA ="http://localhost:8080/productos/obtenerSubastas.php";

const URL_OBTENER_COMPRAR ="http://localhost:8080/productos/obtenerCompar.php";

const URL_OBTENER_SUBASTA_ADMIN ="http://localhost:8080/productos/obtenerSubastasAdmin.php";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  registrarProducto(Producto: Producto) {
    console.log(Producto);
    
    return this.http
      .post(URL_CREAR_PRODUCTO, JSON.stringify(Producto))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          this.swalError();
        } else {
          this.swalCreado();
        }
      });
  }

  registrarCarrito(Carrito: Carrito) {
    return this.http
      .post(URL_CREAR_CARRITO, JSON.stringify(Carrito))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          this.swalError();
        } else {
          this.swalCreado();
        }
      });
  }

  cambiarEstado(Producto: Producto) {
    console.log(Producto.Estado);
    console.log(Producto.idProducto);
    return this.http
      .post(URL_CAMBIAR_ESTADO_PRODUCTO, JSON.stringify(Producto))
      .subscribe((val: any) => {
        if (val.resultado == 'error') {
          this.swalError();
        } else {
          this.swalCreado();
        }
      });
  }

  editarProducto(producto: Producto) {
    console.log(producto);

    return this.http.put(URL_EDITAR_PRODUCTO, JSON.stringify(producto));
  }

  obtenerProducto() {
    return this.http.get(URL_OBTENER_PRODUCTO);
  }

  obtenersubasta() {
    return this.http.get(URL_OBTENER_SUBASTA);
  }

  obtenerComprar() {
    return this.http.get(URL_OBTENER_COMPRAR);
  }

  obtenerProductoValidar() {
    return this.http.get(URL_OBTENER_PRODUCTOS_VALIDAR);
  }

  obtenerProductosAdmin() {
    return this.http.get(URL_OBTENER_PRODUCTO_ADMIN);
  }

  obtenerSubastaAdmin() {
    return this.http.get(URL_OBTENER_SUBASTA_ADMIN);
  }

  borrarProducto(idProducto: any) {
    console.log('Entra funcion');
    console.log(idProducto);

    return this.http
      .delete(URL_BORRAR_PRODUCTO + `?idProducto=${idProducto}`)
      .subscribe((val: any) => {
        console.log(val);
      });
  }

  printarProductoId(idCategoria: any){
    console.log(idCategoria);
    
    return this.http.get(
      URL_PRINTAR_PRODUCTOS_ID + `?idCategoria=${idCategoria}`
    );
  }

  PasarProductoId(idProducto: any) {
    return this.http.get(
      URL_OBTENER_PRODUCTO_ID + `?idDireccion=${idProducto}`
    );
  }

  PasarIdVendedorInfo(idVendedor:any){
    return this.http.get(
      URL_OBTENER_VENDEDOR_INFO + `?idVendedor=${idVendedor}`
    );
  }

  PasarVendedorId(idVendedor: any) {
    return this.http.get(
      URL_OBTENER_VENDEDOR_ID + `?idDireccion=${idVendedor}`
    );
  }

  PasarHistorialVenta(idVendedor: any) {
    return this.http.get(URL_HISTORIAL_VENTAS_ID + `?idVendedor=${idVendedor}`);
  }


  obtenerDireccionCarrito(idProductoInfo:any) {
    return this.http.get(
      URL_OBTENER_DIRECCION + `?idProductoInfo=${idProductoInfo}`
    );
  }

  historialVentas(){
    return this.http.get(URL_HISTORIAL_VENTAS);
  }

  contarProductos() {
    return this.http.get(URL_CONTAR_PRODUCTOS);
  }

  contarProductosSubasta() {
    return this.http.get(URL_CONTAR_PRODUCTOS_SUBASTA);
  }

  contarProductosSinVerificar() {
    return this.http.get(URL_CONTAR_PRODUCTOS_SIN_VERIFICAR);
  }

  validarProducto(idProducto:number){
    console.log(idProducto);
    
    return this.http.get(
      URL_VALIDAR_PRODUCTO + `?idProducto=${idProducto}`
    );
  }

  swalCreado() {
    Swal.fire(
      'Producto creado!',
      '¡Se ha creado el nuevo Producto!',
      'success'
    );
  }

  swalCreadoCarrito() {
    Swal.fire('Producto Comprado!', '¡Se ha Comprado el Producto!', 'success');
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Las credenciales son incorrectas!',
    });
  }
}
