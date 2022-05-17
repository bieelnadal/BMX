import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';


@Component({
  selector: 'app-gestor-productos-vista-usuario',
  templateUrl: './gestor-productos-vista-usuario.component.html',
  styleUrls: ['./gestor-productos-vista-usuario.component.css']
})
export class GestorProductosVistaUsuarioComponent implements OnInit {

  datosProducto: Producto = {
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

  listaProductos: any[] = [];
  producto: any;
  idVendedor:any;


  constructor(
    private prodServ: ProductsService,
    private tokenServ: TokenSesionService,
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.idVendedor =this.datosUsuario.idUsuario;
    this.pasarIdProducto();
    console.log(this.listaProductos);
    
    //this.obtenerProductos();
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();

  }

  pasarIdProducto() {
    this.listaProductos = [];
    console.log(this.idVendedor);
    
    this.prodServ.PasarMisVenta(this.idVendedor).subscribe((val: any) => {
      this.producto = val;   
      if (this.producto == null) {      
      } else {
        
        val.forEach((element: any) => {
            this.listaProductos.push(element);

            
        }); 
      }
    });
  }

  obtenerProductos() {
    this.listaProductos = [];
    this.prodServ.obtenerProductosUsuario().subscribe((val: any) => {
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
