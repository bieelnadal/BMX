import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-tabla-verificar-productos',
  templateUrl: './tabla-verificar-productos.component.html',
  styleUrls: ['./tabla-verificar-productos.component.css'],
})
export class TablaVerificarProductosComponent implements OnInit {
  listaProductosValidar: any[] = [];
  producto: any;

  constructor(private prodServ: ProductsService) {}

  ngOnInit() {
    this.obtenerProductosValidar();
  }

  obtenerProductosValidar() {
    this.listaProductosValidar = [];
    this.prodServ.obtenerProductoValidar().subscribe((val: any) => {
      this.producto = val;
      if (this.producto == null) {
      } else {
        val.forEach((element: any) => {
          console.log(element);
          
          this.listaProductosValidar.push(element);
        });
      }
    });
  }
}
