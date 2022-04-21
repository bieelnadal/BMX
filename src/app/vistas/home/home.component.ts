import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  opened = false;
  listaProductos: any[] = [];
  producto: any;

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
    this.ProductsService.obtenerProducto().subscribe((val: any) => {
      this.producto = val;
      if (this.producto == null) {
        console.log('producto es null');
        
      } else {
        console.log('entra');
        console.log(this.listaProductos);
        
        val.forEach((element: any) => {
          console.log('entra for each');
            this.listaProductos.push(element);
            console.log(this.listaProductos);
          
        });
      }
    });

    };
  



}
