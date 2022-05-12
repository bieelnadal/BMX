import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/interfaces/Productos';
import Swal from 'sweetalert2';
import { ProductsService } from 'src/app/services/productos/products.service';

@Component({
  selector: 'app-editar-subasta-modal',
  templateUrl: './editar-subasta-modal.component.html',
  styleUrls: ['./editar-subasta-modal.component.css']
})
export class EditarSubastaModalComponent implements OnInit {
  modalClick: boolean | undefined;
  imgSrc: any;

  modEditarProd!: FormGroup;

  @Input() prodSelecc: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private prodServ: ProductsService
  ) {}

  ngOnInit(): void {}

  crearForm() {
    this.modEditarProd = this.formBuilder.group(
      {
        Nombre: [this.prodSelecc.Nombre, [Validators.required]],
        Imagen: ['',],
        Descripcion: [this.prodSelecc.Descripcion, [Validators.required]],
        idCategoria: [this.prodSelecc.idCategoria, [Validators.required]],
        Activo: [this.prodSelecc.Activo, [Validators.required]],
        Precio: [this.prodSelecc.Precio, [Validators.required]],
      },
      {}
    );
  }

  get form(){
    return this.modEditarProd.controls;
  }

  get Imagen() {
    return this.modEditarProd.get('Imagen') as FormControl;
  }

  retornar() {
    this.modalService.dismissAll();
  }

  enviar(modal: any) {
    this.modalClick = true;
    this.modalService.open(modal);

    this.crearForm();
  }

  recogerDatos() {}

  onSubmit(form: any) {
    let newProd:Producto;

    if (form.valid) {
      if (form.controls.Imagen.value!='') {
        newProd = {
          idProducto: this.prodSelecc.idProducto,
          idVendedor: this.prodSelecc.idVendedor,
          Nombre: form.controls.Nombre.value,
          Imagen: this.imgSrc,
          Descripcion: form.controls.Descripcion.value,
          idCategoria: form.controls.idCategoria.value,
          Fecha: this.prodSelecc.Fecha,
          Estado: this.prodSelecc.Estado,
          Activo: form.controls.Activo.value,
          Precio: form.controls.Precio.value,
          Subasta: this.prodSelecc.Subasta
        }
      }else{
        newProd = {
          idProducto: this.prodSelecc.idProducto,
          idVendedor: this.prodSelecc.idVendedor,
          Nombre: form.controls.Nombre.value,
          Imagen: this.prodSelecc.Imagen,
          Descripcion: form.controls.Descripcion.value,
          idCategoria: form.controls.idCategoria.value,
          Fecha: this.prodSelecc.Fecha,
          Estado: this.prodSelecc.Estado,
          Activo: form.controls.Activo.value,
          Precio: form.controls.Precio.value,
          Subasta: this.prodSelecc.Subasta
        }    
        
      }
      this.prodServ.editarProducto(newProd).subscribe();
      window.location.reload();
    }else{
      
      
      console.log("gangshit");
      
    }
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
