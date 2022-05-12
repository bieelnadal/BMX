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

  d: any;
  m: any;
  h: any;
  s: any;

  id: any;

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

    this.updateCountdownTime(this.subasta.fechaFinal);
    this.id = setInterval(() => {
      this.updateCountdownTime(this.subasta.fechaFinal);
    }, 1000);
  }

  pasarIdProducto() {
    this.ProductsService.PasarProductoId(this.idProducto).subscribe(
      (val: any) => {
        this.producto = val.data;
        this.fecha(this.producto.Fecha);

        if (this.producto.Subasta == 1) {
          this.subastaServ
            .obtenerSubastaProductoId(this.producto.idProducto)
            .subscribe((val: any) => {
              this.subasta = val.data;
              this.updateCountdownTime(this.subasta.fechaFinal);
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
    Swal.fire({
      text:
        '¿Cuánto dinero quieres pujar? Actualmente, la apuesta máxima es de ' +
        subasta.precioFinal +
        '€.',
      input: 'number',
    }).then((result) => {
      console.log(result.value);
      console.log(datosUsuario.idUsuario);
      

      let puja: Puja = {
        idPuja: 0,
        idUsuario: datosUsuario.idUsuario,
        Precio: result.value,
        Fecha: '',
        idSubasta: subasta.idSubasta,
      };

      if (result.value > subasta.precioFinal) {
        this.subastaServ.crearPuja(puja);
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Puja incorrecta!',
        });
      }
    });
  }

  fecha(fechaBd: any) {
    let today = new Date();

    let date: string =
      today.getFullYear() +
      '-0' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate() +
      ' ' +
      today.getHours() +
      ':' +
      today.getMinutes() +
      ':' +
      today.getSeconds();

    if (fechaBd > date) {
      console.log('mas alto');
    } else {
      console.log('menor');
    }
  }

  updateCountdownTime(fechaBd: any) {
    let today = new Date();
    const currentTime: string | any =
      today.getFullYear() +
      '-0' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate() +
      ' ' +
      today.getHours() +
      ':' +
      today.getMinutes() +
      ':' +
      today.getSeconds();

    let fechaBase: any = new Date(fechaBd);
    let current: any = new Date(currentTime);

    let remTime = fechaBase - current;

    this.s = Math.floor(remTime / 1000);
    this.m = Math.floor(this.s / 60);
    this.h = Math.floor(this.m / 60);
    this.d = Math.floor(this.h / 24);

    this.h %= 24;
    this.m %= 60;
    this.s %= 60;

    this.h = this.h < 10 ? '0' + this.h : this.h;
    this.m = this.m < 10 ? '0' + this.m : this.m;
    this.s = this.s < 10 ? '0' + this.s : this.s;
  }
}
