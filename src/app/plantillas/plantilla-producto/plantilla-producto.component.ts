import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/productos/products.service';
import { Producto } from 'src/app/interfaces/Productos';
import { Usuario } from 'src/app/interfaces/Usuario';
import Swal from 'sweetalert2';
import { Subasta } from '../../interfaces/Subastas';
import { SubastasService } from 'src/app/services/subastas/subastas.service';
import { Puja } from 'src/app/interfaces/Puja';

@Component({
  selector: 'app-plantilla-producto',
  templateUrl: './plantilla-producto.component.html',
  styleUrls: ['./plantilla-producto.component.css'],
})
export class PlantillaProductoComponent implements OnInit {
  nombreProducto: any;
  idProducto: any;
  idVendedor: any;

  producto: Producto = {
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

  subasta: Subasta = {
    idSubasta: 0,
    idComprador: 0,
    precioInicial: 0,
    precioFinal: 0,
    vendido: 0,
    fechaInicial: '',
    fechaFinal: '',
    idProducto: 0,
  };

  datosUsuario: Usuario = {
    idUsuario: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Passcode: '',
    idDireccion: 0,
    Imagen: '',
    DNI: '',
    idAdmin: 0,
  };

  constructor(
    private _route: ActivatedRoute,
    private ProductsService: ProductsService,
    private subastaServ: SubastasService
  ) {}

  ngOnInit(): void {
    this.nombreProducto = this._route.snapshot.paramMap.get('nombre');
    this.idProducto = this._route.snapshot.paramMap.get('id');
    this.pasarIdProducto();
  }

  pasarIdProducto() {
    this.ProductsService.PasarProductoId(this.idProducto).subscribe(
      (val: any) => {
        this.producto = val.data;
        if (this.producto.Subasta == 1) {
          this.subastaServ
            .obtenerSubastaProductoId(this.producto.idProducto)
            .subscribe((val: any) => {
              this.subasta = val.data;
            });
        }
        this.idVendedor = this.producto.idVendedor;
        this.ProductsService.PasarVendedorId(this.idVendedor).subscribe(
          (val: any) => {
            this.datosUsuario = val.data;
          }
        );
      }
    );
  }

  pujar(subasta: any, producto: any, datosUsuario: any) {
    this.subastaServ;
    Swal.fire({
      text:
        '¿Cuánto dinero quieres pujar? Actualmente, la apuesta máxima es de ' +
        subasta.precioFinal +
        '€.',
      input: 'number',
    }).then((result) => {
      let puja: Puja = {
        idPuja: 0,
        idUsuario: datosUsuario.idUsuario,
        Precio: result.value,
        Fecha: '',
        idSubasta: subasta.idSubasta,
      };
      this.subastaServ.hacerPujas(puja);
    });
  }
}
