import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';

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

  listaProductos: any[] = [];
  producto: any;

  constructor(
    private userServ: UsersService,
    private prodServ: ProductsService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.listaProductos = [];
    this.prodServ.obtenerProductosAdmin().subscribe((val: any) => {
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
