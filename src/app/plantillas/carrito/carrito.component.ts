import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/productos/products.service';
import { Producto } from 'src/app/interfaces/Productos';
import { Carrito } from 'src/app/interfaces/Carrito';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { DireccService } from 'src/app/services/direcciones/direcc.service';
import { UsersService } from 'src/app/services/usuarios/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  idProducto:any;
  idVendedor:any;
  direccion: any;
  listaDirecciones: any[] = [];
  idDireccion:any;

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
    idDireccion:0,
    IdVendedor:0,
    emailCompador:'',
    emailVendedor:'',
  }


  constructor(
    private _route: ActivatedRoute,
    private ProductsService: ProductsService,
    private tokenServ: TokenSesionService,
    private direccService: DireccService,
    private usersService: UsersService
  ) { }

  ngOnInit():void {
    this.idProducto = this._route.snapshot.paramMap.get('id'); 
   
    this.obtenerDatos();
    this.pasarIdProducto();
    this.obtenerDirecciones();
    

    
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
    
  }


  obtenerDirecciones() {
    this.listaDirecciones = [];
    this.direccService.obtenerDirecciones().subscribe((val: any) => {
      this.direccion = val;
      if (this.direccion == null) {
      } else {

        val.forEach((element: any) => {

          if (element.idUsuario == this.datosUsuario.idUsuario) {
            this.listaDirecciones.push(element);            
          }
        });
      }
    });
  }



  pasarIdProducto(){
    this.ProductsService.PasarProductoId(this.idProducto).subscribe((val: any) => {
      this.producto = val.data;
         
    });    
  }

  pasarIdUsuarioProducto(){
    this.usersService.obtenerUsuarioIdProducto(this.idVendedor).subscribe((val: any) => {
      this.producto = val.data;
         
    });
  }


  cojerIdDireccion(idDireccion:any){  

    
  }




  cambiarEstadoProducto():any{
    this.producto.idProducto=this.idProducto;
    this.producto.Estado= 1;

    this.ProductsService.cambiarEstado(this.producto);
  }

 tramitarProducto():any { 
    this.cambiarEstadoProducto();
    this.carrito.Precio=this.producto.Precio;
    this.carrito.idUsuario=this.datosUsuario.idUsuario;
    this.carrito.idProducto=this.producto.idProducto;
    this.carrito.idDireccion=this.idDireccion;
    this.carrito.emailCompador=this.datosUsuario.Email;
    this.carrito.emailVendedor=this.datosUsuario.Email;
    this.carrito.IdVendedor=this.datosUsuario.idUsuario;
   
    this.ProductsService.registrarCarrito(this.carrito);

    
  }
 

}
