import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //images = [1011, 1011, 1011].map((n) => `https://picsum.photos/id/${n}/900/500`);
  opened = false;
  listaProductos: any[] = [];
  producto: any;
  numberid :any;
  printnum: any;

  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor(  
    private ProductsService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.butttonid(0);
    console.log(this.listaProductos);
    
    
  }



    butttonid(numberid:any){
      
      if (numberid !=0) {
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
         this.printnum = numberid;
      } else if(numberid == 0){
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
      }
      
    }


    
  



}
