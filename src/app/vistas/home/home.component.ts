import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
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
  numberid :any;

  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor(  
    private ProductsService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.butttonid(0);
   // this.obtenerProductos();
 //   console.log(this.numberid);
    
  }


  obtenerProductos() {
    this.listaProductos = [];
    
    this.ProductsService.obtenerProducto().subscribe((val: any) => {
      this.producto = val;
      if (this.producto == null) {
      } else {
        
        val.forEach((element: any) => {
            this.listaProductos.push(element);
        });
      }
    });

    };



    butttonid(numberid:any){
      
      if (numberid !=0) {
        console.log('cat  1 ');
        this.listaProductos = [];
        
        this.ProductsService.printarProductoId(numberid).subscribe((val: any) => {
          this.producto = val;
          if (this.producto == null) {
          } else {
            console.log(val);
            
            val.forEach((element: any) => {
                this.listaProductos.push(element);
                
            });
          }
        });
        
      } else if(numberid == 0){
        this.listaProductos = [];
        console.log('sin cat');
        
        this.ProductsService.obtenerProducto().subscribe((val: any) => {
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
  



}
