import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/Usuario';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  registrarProducto(){

  }

  editarProducto(){

  }

  borrarProducto(){

  }

  // Per exemple . . .

}
