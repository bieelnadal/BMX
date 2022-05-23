import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/interfaces/Productos';
import { Carrito } from 'src/app/interfaces/Carrito';
import { LoginComponent } from 'src/app/identificacion/login/login.component';

const URL = 'https://api-bmx.herokuapp.com/';

const URL_CREAR_PRODUCTO = 'https://api-bmx.herokuapp.com/productos/crearProductos.php';

const URL_CREAR_CARRITO = 'https://api-bmx.herokuapp.com/productos/tramitesCarrito.php';

const URL_OBTENER_PRODUCTO =
  'https://api-bmx.herokuapp.com/productos/obtenerProductos.php';

const URL_CONTAR_PRODUCTOS =
  'https://api-bmx.herokuapp.com/productos/contarProductos.php';

const URL_CONTAR_PRODUCTOS_SUBASTA =
  'https://api-bmx.herokuapp.com/productos/contarProductosSubasta.php';

const URL_OBTENER_PRODUCTO_ID =
  'https://api-bmx.herokuapp.com/productos/obtenerProductoId.php';

const URL_OBTENER_VENDEDOR_ID =
  'https://api-bmx.herokuapp.com/productos/obtenerVendedorId.php';

const URL_CAMBIAR_ESTADO_PRODUCTO =
  'https://api-bmx.herokuapp.com/productos/cambiarEstado.php';

const URL_CONTAR_PRODUCTOS_SIN_VERIFICAR =
  'https://api-bmx.herokuapp.com/productos/contarProductosSinVerificar.php';

const URL_OBTENER_PRODUCTO_ADMIN =
  'https://api-bmx.herokuapp.com/productos/obtenerProductosAdmin.php';

const URL_HISTORIAL_VENTAS_ID =
  'https://api-bmx.herokuapp.com/productos/historialVentasPorId.php';

const URL_BORRAR_PRODUCTO =
  'https://api-bmx.herokuapp.com/productos/borrarProducto.php';

const URL_EDITAR_PRODUCTO =
  'https://api-bmx.herokuapp.com/productos/editarProducto.php';

const URL_OBTENER_VENDEDOR_INFO ="https://api-bmx.herokuapp.com/productos/obtenerVendedorInfo.php";

const URL_OBTENER_DIRECCION ="https://api-bmx.herokuapp.com/productos/obtenerDireccionCarrito.php";

const URL_OBTENER_PRODUCTOS_VALIDAR ="https://api-bmx.herokuapp.com/productos/obtenerProductosValidacion.php";

const URL_VALIDAR_PRODUCTO = "https://api-bmx.herokuapp.com/productos/validarProducto.php";

const URL_HISTORIAL_VENTAS = "https://api-bmx.herokuapp.com/productos/historialVentas.php";

const URL_PRINTAR_PRODUCTOS_ID ="https://api-bmx.herokuapp.com/productos/printarProductosId.php";

const URL_OBTENER_SUBASTA ="https://api-bmx.herokuapp.com/productos/obtenerSubastas.php";

const URL_OBTENER_COMPRAR ="https://api-bmx.herokuapp.com/productos/obtenerCompar.php";

const URL_OBTENER_SUBASTA_ADMIN ="https://api-bmx.herokuapp.com/productos/obtenerSubastasAdmin.php";

const URL_OBTENER_PRODUCTO_USUARIO ="https://api-bmx.herokuapp.com/productos/obtenerProductosUsuario.php";

const URL_OBTENER_PRODUCTO_MIS_VENTAS ="https://api-bmx.herokuapp.com/productos/obtenerMisVentas.php";

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
  editarSubasta(producto: Producto) {
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

  obtenerProductosUsuario() {
    return this.http.get(URL_OBTENER_PRODUCTO_USUARIO);
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
      URL_OBTENER_VENDEDOR_ID + `?idVendedor=${idVendedor}`
    );
  }

  PasarHistorialVenta(idVendedor: any) {
    return this.http.get(URL_HISTORIAL_VENTAS_ID + `?idVendedor=${idVendedor}`);
  }

  PasarMisVenta(idVendedor: any) {
    return this.http.get(URL_OBTENER_PRODUCTO_MIS_VENTAS + `?idVendedor=${idVendedor}`);
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
