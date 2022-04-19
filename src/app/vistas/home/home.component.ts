import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  producto: Producto = {
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
  }

  opened = false;
  listaProductos: any[] = [];


  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor(  
    private ProductsService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos() {
    this.listaProductos = [];
    this.ProductsService.obtenerProducto();
    };
  


}
