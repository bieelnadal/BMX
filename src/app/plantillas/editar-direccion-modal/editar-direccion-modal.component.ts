import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccService } from '../../services/direcciones/direcc.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-direccion-modal',
  templateUrl: './editar-direccion-modal.component.html',
  styleUrls: ['./editar-direccion-modal.component.css'],
})
export class EditarDireccionModalComponent implements OnInit {
  modEditarDirecc!: FormGroup;

  submitted: boolean = false;
  modalClick: boolean = false;
  datosDireccion: any;

  constructor(
    private modalService: NgbModal,
    private direccServ: DireccService,
    private formBuilder: FormBuilder
  ) {}

  @Input() direccSelecc: any;

  ngOnInit(): void {}

  crearForm() {
    this.modEditarDirecc = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      codigoPostal: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      localidad: ['', [Validators.required]],
    });
  }

  get form() {
    return this.modEditarDirecc.controls;
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  enviar(modal: any) {
    this.modalClick = true;
    this.modalService.open(modal);
    this.recogerDatos();
    console.log(this.datosDireccion.Direccion);
    console.log(this.datosDireccion);
    
    this.crearForm();
  }

  recogerDatos() {
    this.direccServ
      .obtenerDireccionId(this.direccSelecc)
      .subscribe((val: any) => {
        this.datosDireccion = val.data;
      });
  }

  onSubmit() {}
}