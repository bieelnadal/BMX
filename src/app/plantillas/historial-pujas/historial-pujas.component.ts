import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubastasService } from 'src/app/services/subastas/subastas.service';

@Component({
  selector: 'app-historial-pujas',
  templateUrl: './historial-pujas.component.html',
  styleUrls: ['./historial-pujas.component.css']
})
export class HistorialPujasComponent implements OnInit {

  modalClick: boolean | undefined;
  listaPujas:any [] = []

  @Input() subastaSelecc:any;

  constructor(private modalService: NgbModal, private subastaServ:SubastasService) { }

  ngOnInit(): void {
    
  }

  enviar(modal: any) {
    this.modalClick = true;
    this.modalService.open(modal);
    this.obtenerPujas();
  }

  retornar() {
    this.modalService.dismissAll();
  }

  obtenerPujas(){
      console.log(this.subastaSelecc);
    
    this.subastaServ.obtenerPujas(this.subastaSelecc).subscribe((val:any) => {
      console.log(this.subastaSelecc);
      
      val.forEach((element:any)=>{
        this.listaPujas.push(element);
      });
    });
  }
  

}
