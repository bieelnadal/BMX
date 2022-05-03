import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { Producto } from 'src/app/interfaces/Productos';

@Component({
  selector: 'app-historial-ventas-admin',
  templateUrl: './historial-ventas-admin.component.html',
  styleUrls: ['./historial-ventas-admin.component.css'],
})
export class HistorialVentasAdminComponent implements OnInit {
  constructor(private prodServ:ProductsService) {}

  listaVentas: any[] = [];
  producto: any;

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.listaVentas = [];
    this.prodServ.historialVentas().subscribe((val: any) => {
      this.producto = val;
      if (this.producto == null) {
      } else {
        val.forEach((element: any) => {
          console.log(element);

          this.listaVentas.push(element);
        });
      }
    });
  }
}
