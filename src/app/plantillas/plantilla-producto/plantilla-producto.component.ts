import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plantilla-producto',
  templateUrl: './plantilla-producto.component.html',
  styleUrls: ['./plantilla-producto.component.css']
})
export class PlantillaProductoComponent implements OnInit {

  nombreProducto: any;
  idProducto:any;

  constructor( private _route: ActivatedRoute) { }



  ngOnInit(): void {
     this.nombreProducto = this._route.snapshot.paramMap.get('nombre');
    this.idProducto = this._route.snapshot.paramMap.get('id'); 

  }



}
