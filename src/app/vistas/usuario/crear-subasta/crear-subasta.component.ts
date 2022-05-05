import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { Subasta } from 'src/app/interfaces/Subastas';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-subasta',
  templateUrl: './crear-subasta.component.html',
  styleUrls: ['./crear-subasta.component.css']
})
export class CrearSubastaComponent implements OnInit {

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

  subasta: Subasta = {
    idSubasta: 0,
    idComprador: 0,
    precioFinal: 0,
    vendido: 0,
    fechaInicial: '',
    fechaFinal: '',
    idProducto: 0,
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
      DescripcionProducto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],   
      Categoria: ['', Validators.required],
      tiempoSubasta:['',Validators.required],
      PrecioProducto: ['', Validators.required],       
      imagenProducto: ['', Validators.required],
    });
  }

  get form() {
    return this.crearProdutoForm.controls;
  }

  get nombreProducto() {
    return this.crearProdutoForm.get('NombreProducto') as FormControl;
  }
  get DescripcionProducto() {
    return this.crearProdutoForm.get('DescripcionProducto') as FormControl;
  }
  get CategoriaProducto() {
    return this.crearProdutoForm.get('Categoria') as FormControl;
  }
  get tiempoSubasta(){
    return this.crearProdutoForm.get('tiempoSubasta') as FormControl;
  }
  get PrecioProducto() {
    return this.crearProdutoForm.get('PrecioProducto') as FormControl;
  }
  get imagenProducto() {
    return this.crearProdutoForm.get('imagenProducto') as FormControl;
  }

  



  crearProductoNuevo(): any {
    this.submitted = true;
    if (this.PrecioProducto.value > 0) {
      this.producto.idVendedor = this.datosUsuario.idUsuario;
      this.producto.Nombre = this.nombreProducto.value;
      this.producto.Imagen = this.imgSrc;
      this.producto.Descripcion = this.DescripcionProducto.value;
      this.producto.idCategoria = this.CategoriaProducto.value;
      this.producto.Precio = this.PrecioProducto.value;
   //   this.producto.Fecha = this.tiempoSubasta.value;
      this.ProductsService.registrarProducto(this.producto);
console.log('hola');

     // this.router.navigate(['home']);
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
