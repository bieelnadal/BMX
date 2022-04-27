import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccService } from '../../services/direcciones/direcc.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Direccion } from 'src/app/interfaces/Direccion';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';

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
  datosUsuario: any;

  constructor(
    private modalService: NgbModal,
    private direccServ: DireccService,
    private formBuilder: FormBuilder,
    private tokenServ: TokenSesionService
  ) {}

  @Input() direccSelecc: any;

  ngOnInit(): void {
    this.recogerDatos();
  }

  crearForm() {
    this.modEditarDirecc = this.formBuilder.group({
      direccion: [this.datosDireccion.Direccion, [Validators.required]],
      pais: [1, [Validators.required]],
      codigoPostal: [
        this.datosDireccion.codigoPostal,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      localidad: [this.datosDireccion.Localidad, [Validators.required]],
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
    console.log(this.datosDireccion.Direccion);

    this.modalClick = true;
    this.modalService.open(modal);

    this.crearForm();
  }

  recogerDatos() {
    console.log(this.direccSelecc);

    this.direccServ
      .obtenerDireccionId(this.direccSelecc)
      .subscribe((val: any) => {
        this.datosDireccion = val.data;
      });
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  onSubmit(form: any) {
    if (this.modEditarDirecc.valid) {
      console.log('Válido');

      const newDirecc: Direccion = {
        idDireccion: this.datosDireccion.idDireccion,
        Direccion: form.direccion,
        Pais: form.pais,
        codigoPostal: form.codigoPostal,
        Localidad: form.localidad,
        idUsuario: this.datosUsuario.idUsuario,
        Predeterminado: 0,
      };
      this.direccServ.editarDireccion(newDirecc);
      window.location.reload();
    } else {
      console.log('No es válido');
    }
  }
}
