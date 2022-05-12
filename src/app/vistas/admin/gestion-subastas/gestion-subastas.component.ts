import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-gestion-subastas',
  templateUrl: './gestion-subastas.component.html',
  styleUrls: ['./gestion-subastas.component.css']
})
export class GestionSubastasComponent implements OnInit {

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
    private prodServ: ProductsService
  ) { }

  ngOnInit() {
    this.obtenerSubastas();
  }

  obtenerSubastas() {
    this.listaProductos = [];
    this.prodServ.obtenerSubastaAdmin().subscribe((val: any) => {
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
