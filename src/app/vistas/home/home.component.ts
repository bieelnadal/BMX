import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


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

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor( config: NgbCarouselConfig, 
    private ProductsService: ProductsService,


    ) {     
      config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.butttonid(0);

    
  }



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
