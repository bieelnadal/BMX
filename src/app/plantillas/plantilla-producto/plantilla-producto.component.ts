import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/productos/products.service';
import { Producto } from 'src/app/interfaces/Productos';

@Component({
  selector: 'app-plantilla-producto',
  templateUrl: './plantilla-producto.component.html',
  styleUrls: ['./plantilla-producto.component.css']
})
export class PlantillaProductoComponent implements OnInit {

  nombreProducto: any;
  idProducto:any;
  producto: Producto ={
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

  constructor( 
    private _route: ActivatedRoute,
    private ProductsService: ProductsService,) { }



  ngOnInit(): void {
     this.nombreProducto = this._route.snapshot.paramMap.get('nombre');
    this.idProducto = this._route.snapshot.paramMap.get('id'); 
    this.pasarIdProducto();

  }


  pasarIdProducto(){
    this.ProductsService.PasarProductoId(this.idProducto).subscribe((val: any) => {
      this.producto = val.data;
      console.log(this.producto);     
    });
  }

  cojerDatosSelectProductoId(){

  }


}
