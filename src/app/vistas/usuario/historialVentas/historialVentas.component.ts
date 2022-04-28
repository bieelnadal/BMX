import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Producto } from 'src/app/interfaces/Productos';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Carrito } from 'src/app/interfaces/Carrito';

@Component({
  selector: 'app-historialVentas',
  templateUrl: './historialVentas.component.html',
  styleUrls: ['./historialVentas.component.css']
})
export class HistorialVentasComponent implements OnInit {

  idVendedor:any;
  listaProductos: any[] = [];
  producto: any;
  productoSelec :any;
  desplegableVisual:boolean =false;



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

  datosVendedor: Usuario = {
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

  
  carrito: Carrito = {
    idCarrito: 0,
    Precio: 0,
    idUsuario: 0,
    idProducto: 0,
    idDireccion: 0,
    IdVendedor: 0,
    emailCompador: '',
    emailVendedor: '',
  }


  constructor(
    private ProductsService: ProductsService,
    private tokenServ: TokenSesionService,

  ) { }

  ngOnInit() {
    this.obtenerDatos();
    this.idVendedor =this.datosUsuario.idUsuario;
    this.pasarIdProducto();
    

  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();

  }
  
  pasarIdProducto() {
    this.listaProductos = [];
    this.ProductsService.PasarHistorialVenta(this.idVendedor).subscribe((val: any) => {
      this.producto = val;
      if (this.producto == null) {
      } else {
        
        val.forEach((element: any) => {
            this.listaProductos.push(element);
        }); 
      }
    });
  }

  desplegableVentas(prod: any){
    this.productoSelec =prod;
    if(this.desplegableVisual){
      this.desplegableVisual=false;
    }else{
      this.desplegableVisual=true;
    }
    this.infoVendedor();
    this.direccionEnvio();
    
  }

  infoVendedor(){
    let idVendedorInfo = this.productoSelec.idVendedor;
    this.ProductsService.PasarIdVendedorInfo(idVendedorInfo).subscribe((val: any) => {
      this.datosVendedor = val.data;
    });
  }
  
  direccionEnvio(){
    let idProductoInfo = this.productoSelec.idProducto;
    console.log(idProductoInfo);
    
    this.ProductsService.obtenerDireccionCarrito(idProductoInfo).subscribe((val: any) => {
      this.carrito = val.data;
    });
  }



}
