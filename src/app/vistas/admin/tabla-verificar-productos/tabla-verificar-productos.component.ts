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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then((result)=>{
          this.prodServ.validarProducto(idProducto).subscribe();
          window.location.reload();
        })
      }
    })
    
  }

  denegarProducto(idProducto:number) {
    this.prodServ.borrarProducto(idProducto);
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
