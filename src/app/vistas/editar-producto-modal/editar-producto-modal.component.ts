import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { Producto } from 'src/app/interfaces/Productos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.css'],
})
export class EditarProductoModalComponent implements OnInit {
  modalClick: boolean | undefined;
  imgSrc: any;

  modEditarProd!: FormGroup;


  @Input() prodSelecc:any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {

  }

  crearForm() {
    this.modEditarProd = this.formBuilder.group(
      {
        Nombre: [],
        Imagen: [],
        Descripcion: [],
        idCategoria: [],
        Estado: [],
        Activo: [],
        Precio: [],
      },
      {
      }
    );
  }

  retornar() {
    this.modalService.dismissAll();
  }

  enviar(modal: any) {
    this.modalClick = true;
    this.modalService.open(modal);

    this.crearForm();
    console.log(this.prodSelecc);
    
  }

  recogerDatos() {

  }

  onSubmit(form: any) {

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
