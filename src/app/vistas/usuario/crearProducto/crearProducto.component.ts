import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Productos';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ProductsService } from 'src/app/services/productos/products.service';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-crearProducto',
  templateUrl: './crearProducto.component.html',
  styleUrls: ['./crearProducto.component.css']
})
export class CrearProductoComponent implements OnInit {

  crearProdutoForm !: FormGroup;
  submitted: boolean = false;

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
    private tokenServ: TokenSesionService) { }

  ngOnInit() {
    this.crearForm();
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.datosUsuario = this.tokenServ.getUsuario();
  }


  crearForm() {
    this.crearProdutoForm = this.formBuilder.group({
      NombreProducto: ['', Validators.required],
      imagenProducto: ['', Validators.required],
      DescripcionProducto: ['', Validators.required],
      idCategoriaProducto: ['', Validators.required],
      //FechaProducto: ['', Validators.required],
      PrecioProducto: ['', Validators.required],
      SubastaProducto: ['', Validators.required],
    });
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
  get idCategoriaProducto() {
    return this.crearProdutoForm.get('idCategoriaProducto') as FormControl;
  }
  get FechaProducto() {
    return this.crearProdutoForm.get('FechaProducto') as FormControl;
  }
  get PrecioProducto() {
    return this.crearProdutoForm.get('PrecioProducto') as FormControl;
  }
  get SubastaProducto() {
    return this.crearProdutoForm.get('SubastaProducto') as FormControl;
  }


  crearProductoNuevo():any { 
    this.producto.idVendedor = this.datosUsuario.idUsuario;
    this.producto.Nombre = this.nombreProducto.value;
    this.producto.Imagen = this.imagenProducto.value;
    this.producto.Descripcion = this.DescripcionProducto.value;
    this.producto.idCategoria = this.idCategoriaProducto.value;
    this.producto.Precio = this.PrecioProducto.value;
    this.producto.Subasta = this.SubastaProducto.value;

    this.ProductsService.registrarProducto(this.producto)
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

}
