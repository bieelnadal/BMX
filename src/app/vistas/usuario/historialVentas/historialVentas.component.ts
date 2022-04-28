import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Producto } from 'src/app/interfaces/Productos';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-historialVentas',
  templateUrl: './historialVentas.component.html',
  styleUrls: ['./historialVentas.component.css']
})
export class HistorialVentasComponent implements OnInit {

  idVendedor:any;
  listaProductos: any[] = [];
  producto: any;



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


  constructor(
    private ProductsService: ProductsService,
    private tokenServ: TokenSesionService,

  ) { }

  ngOnInit() {
    this.obtenerDatos();
    this.idVendedor =this.datosUsuario.idUsuario;
    console.log(this.idVendedor);
    this.pasarIdProducto();
    console.log(this.producto);
    

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

}
