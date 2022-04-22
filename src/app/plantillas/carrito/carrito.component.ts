import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/productos/products.service';
import { Producto } from 'src/app/interfaces/Productos';
import { Carrito } from 'src/app/interfaces/Carrito';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  idProducto:any;
  producto: Producto ={
    idProducto: 0,
    idVendedor: 0,
    Nombre: '',
    Imagen: '',
    Descripcion: '',
    idCategoria: 0,
    Fecha: '',
    Estado: 0,
    Activo: 0,
    Precio: 0,
    Subasta: 0,
  };

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


  carrito:Carrito={
    idCarrito:0,
    Precio:0,
    idUsuario:0,
    idProducto:0,
  }


  constructor(
    private _route: ActivatedRoute,
    private ProductsService: ProductsService,
    private tokenServ: TokenSesionService,
  ) { }

  ngOnInit():void {
    this.idProducto = this._route.snapshot.paramMap.get('id'); 
    this.obtenerDatos();
    this.pasarIdProducto();
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }




  pasarIdProducto(){
    this.ProductsService.PasarProductoId(this.idProducto).subscribe((val: any) => {
      this.producto = val.data;
      console.log(this.producto);  
         
    });
  }

  crearProductoNuevo():any { 

    this.carrito.Precio=this.producto.Precio;
    this.carrito.idUsuario=this.datosUsuario.idUsuario;
    this.carrito.idProducto=this.producto.idProducto;
   
    this.ProductsService.registrarCarrito(this.carrito);

    
  }
 

}
