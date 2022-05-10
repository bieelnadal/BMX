import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';


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
  printnum: any;
  buscadorInput!: FormGroup;

  closeSidenav(){
      this.opened = !this.opened;
    }


  constructor(  
    private ProductsService: ProductsService,
    public formBuilder: FormBuilder,
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


      //buscador
  filtro: any;
  ProductoBuscar: any;
  splitArray: any;
  i: any;
  textoBuscador: any;
  imputBuscador: any = undefined;

  crearformInput() {
    this.buscadorInput = this.formBuilder.group({
      nombreBuscador: [''],
    });
  }

  get nombreBuscador() {
    return this.buscadorInput.get('nombreBuscador') as FormControl;
  }

  buscador(): any {
    
    this.nombreBuscador.valueChanges.subscribe((nombreBuscador) => {
      this.imputBuscador = document.getElementById('buscadorId');
      this.filtro = nombreBuscador.toUpperCase();
      this.ProductoBuscar =
        document.getElementsByClassName('NombreProducto');
    
      for (this.i = 0; this.i < this.ProductoBuscar.length; this.i++) {
        var text = this.ProductoBuscar[this.i].innerText.split('\n');
        if (text[0].toUpperCase().indexOf(this.filtro) > -1) {
          this.ProductoBuscar[this.i].style.display = '';
        } else {
          this.ProductoBuscar[this.i].style.display = 'none';
        }
      }
    });
  }





}
