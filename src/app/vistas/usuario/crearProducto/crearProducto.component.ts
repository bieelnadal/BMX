import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crearProducto',
  templateUrl: './crearProducto.component.html',
  styleUrls: ['./crearProducto.component.css']
})
export class CrearProductoComponent implements OnInit {

  crearProdutoForm !: FormGroup;
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
  }


  constructor(
    public formBuilder: FormBuilder,
    private ProductsService: ProductsService,
    private tokenServ: TokenSesionService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.crearForm();
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }


  crearForm() {
    this.crearProdutoForm = this.formBuilder.group({
      NombreProducto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      imagenProducto: ['', Validators.required],
      DescripcionProducto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      PrecioProducto: ['', Validators.required],
      Categoria: ['', Validators.required]
    });
  }

  get form() {
    return this.crearProdutoForm.controls;
  }

  get nombreProducto() {
    return this.crearProdutoForm.get('NombreProducto') as FormControl;
  }
  get imagenProducto() {
    return this.crearProdutoForm.get('imagenProducto') as FormControl;
  }
  get DescripcionProducto() {
    return this.crearProdutoForm.get('DescripcionProducto') as FormControl;
  }
  get FechaProducto() {
    return this.crearProdutoForm.get('FechaProducto') as FormControl;
  }
  get PrecioProducto() {
    return this.crearProdutoForm.get('PrecioProducto') as FormControl;
  }
  get CategoriaProducto() {
    return this.crearProdutoForm.get('Categoria') as FormControl;
  }


  crearProductoNuevo(): any {
    if (this.PrecioProducto.value > 0) {
      this.producto.idVendedor = this.datosUsuario.idUsuario;
      this.producto.Nombre = this.nombreProducto.value;
      this.producto.Imagen = this.imgSrc;
      this.producto.Descripcion = this.DescripcionProducto.value;
      this.producto.idCategoria = this.CategoriaProducto.value;
      this.producto.Precio = this.PrecioProducto.value;
      this.ProductsService.registrarProducto(this.producto);
      
      this.router.navigate(['home']);   
    } else { 
      this.swalError();
    }


  }

  onSubmit() {
    this.submitted = true;

    if (this.crearProdutoForm.valid) {
      console.log('Funcion onSubmit pasa a funcion crearProducto');
      this.crearProductoNuevo();


    }
  }


  swalError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo no funciona bien, perdone la molestias!',
    })
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
