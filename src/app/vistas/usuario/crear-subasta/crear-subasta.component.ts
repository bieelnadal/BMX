import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { Subasta } from 'src/app/interfaces/Subastas';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Router } from '@angular/router';
import { SubastasService } from 'src/app/services/subastas/subastas.service';

@Component({
  selector: 'app-crear-subasta',
  templateUrl: './crear-subasta.component.html',
  styleUrls: ['./crear-subasta.component.css'],
})
export class CrearSubastaComponent implements OnInit {
  crearSubastaForm!: FormGroup;
  submitted: boolean = false;
  imgSrc: any;

  datosUsuario: Usuario = {
    idUsuario: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Passcode: '',
    idDireccion: 0,
    Imagen: '',
    DNI: '',
    idAdmin: 1,
  };

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
    precioFinal: 0,
    vendido: 0,
    fechaInicial: '',
    fechaFinal: '',
    idProducto: 0,
  };

  constructor(
    public formBuilder: FormBuilder,
    private prodServ: ProductsService,
    private tokenServ: TokenSesionService,
    private subastaServ: SubastasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerDatos();
    this.crearForm();
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  crearForm() {
    this.crearSubastaForm = this.formBuilder.group({
      nombreProducto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      descripcionProducto: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      categoria: ['', Validators.required],
      tiempoSubasta: ['', Validators.required],
      pujaInicial: ['', Validators.required],
      precioCompra: ['', Validators.required],
      imagenProducto: ['', Validators.required],
    });
  }

  get form() {
    return this.crearSubastaForm.controls;
  }

  onSubmit(form: any) {
    let date: string = this.escogerDate();
    console.log(date);
    
    this.submitted = true;
    if (
      this.crearSubastaForm.controls.pujaInicial.value >
      this.crearSubastaForm.controls.precioCompra.value
    ) {
      this.swalInferior();
    } else {
      if (this.crearSubastaForm.valid) {
        let prod = {};
        let subasta = {};
        prod = {
          idProducto: 0,
          idVendedor: this.datosUsuario.idUsuario,
          Nombre: this.crearSubastaForm.controls.nombreProducto.value,
          Imagen: this.imgSrc,
          Descripcion: this.crearSubastaForm.controls.descripcionProducto.value,
          idCategoria: this.crearSubastaForm.controls.categoria.value,
          Precio: this.crearSubastaForm.controls.precioCompra.value,
          Subasta: 1,
        };

        subasta = {
          idSubasta: 0,
          idComprador: 0,
          precioInicial: this.crearSubastaForm.controls.pujaInicial.value,
          precioFinal: this.crearSubastaForm.controls.pujaInicial.value,
          vendido: 0,
          fechaFinal: date,
        };
        this.subastaServ.crearSubasta(prod, subasta);
        
      } else {
      }
    }
  }

  escogerDate(): string {
    let today = new Date();

    let date: string = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 1) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate() + " " + (today.getHours() + 1) + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 2) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + (today.getDate() + 1) + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 3) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + (today.getDate() + 3) + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 4) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + (today.getDate() + 7) + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 5) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 2) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
    if (this.crearSubastaForm.controls.tiempoSubasta.value == 6) {
      date = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + (today.getMinutes()+1) + ":" + today.getSeconds();
      console.log(date);
      
    }

    return date;
  }

  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo no funciona bien, perdone la molestias!',
    });
  }

  swalInferior() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡El precio de compra no puede ser inferior a la primera puja!',
    });
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(file);
    }
  }
}
