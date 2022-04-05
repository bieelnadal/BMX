import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccService } from '../../services/direcciones/direcc.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-direccion-modal',
  templateUrl: './editar-direccion-modal.component.html',
  styleUrls: ['./editar-direccion-modal.component.css']
})
export class EditarDireccionModalComponent implements OnInit {

  modEditarDirecc!:FormGroup;

  constructor(private modalService: NgbModal,private direccServ: DireccService, private formBuilder: FormBuilder) { }

  @Input() direccSelecc:any;

  ngOnInit(): void {
  this.crearForm();
  }

  crearForm(){
    this.modEditarDirecc = this.formBuilder.group({
      
    })
  }

}
