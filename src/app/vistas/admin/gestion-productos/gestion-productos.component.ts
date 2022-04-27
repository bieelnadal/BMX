import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsersService } from 'src/app/services/usuarios/users.service';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css'],
})
export class GestionProductosComponent implements OnInit {
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
        console.log('entra');

        val.forEach((element: any) => {
          console.log('entra for each');
          console.log(element);
          
          this.listaProductos.push(element);
          console.log(this.listaProductos);
        });
      }
    });
  }
}
