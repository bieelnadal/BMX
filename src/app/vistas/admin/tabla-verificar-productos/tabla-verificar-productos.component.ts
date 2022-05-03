import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productos/products.service';
import Swal from 'sweetalert2';

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

  validarProducto(idProducto:number) {
    Swal.fire({
      title: '¿Estás seguro de que quieres validar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Validar Producto'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Producto Validado!',
          'El producto seleccionado ha sido validado correctamente.',
          'success'
        ).then((result)=>{
          this.prodServ.validarProducto(idProducto).subscribe();
          window.location.reload();
        })
      }
    })
    
  }

  denegarProducto(idProducto:number) {
    Swal.fire({
      title: '¿Estás seguro de que quieres denegar la validación?',
      text: 'Se va a denegar la validación y el producto seleccionado va a ser eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Denegar Validación'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Producto Borrado!',
          'El producto seleccionado ha sido borrado correctamente.',
          'success'
        ).then((result)=>{
          this.prodServ.borrarProducto(idProducto);
          window.location.reload();
        })
      }
    })
    
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
