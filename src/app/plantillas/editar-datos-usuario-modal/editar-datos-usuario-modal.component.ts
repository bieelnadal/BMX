import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/Usuario';
import { TokenSesionService } from 'src/app/services/tokenSesion/token-sesion.service';
import { UsersService } from 'src/app/services/usuarios/users.service';

@Component({
  selector: 'app-editar-datos-usuario-modal',
  templateUrl: './editar-datos-usuario-modal.component.html',
  styleUrls: ['./editar-datos-usuario-modal.component.css'],
})
export class EditarDatosUsuarioModalComponent implements OnInit {
  modEditarUsuario!: FormGroup;

  submitted: boolean = false;
  modalClick: boolean = false;
  datosUsuarioSeleccionado: any;
  datosUsuario: any;

  passShown: boolean = false;
  confirmPassShown: boolean = false;

  passType: string = 'password';
  confirmPassType: string = 'password';

  imgSrc: string = '/assets/avatardefault.png';

  constructor(
    private modalService: NgbModal,
    private usersServ: UsersService,
    private formBuilder: FormBuilder,
    private tokenServ: TokenSesionService
  ) {}

  @Input() userSelecc: any;

  ngOnInit(): void {
    this.recogerDatos();
  }

  crearForm() {
    this.modEditarUsuario = this.formBuilder.group({
      nombre: [this.datosUsuarioSeleccionado.Nombre, [Validators.required]],
      apellidos: [
        this.datosUsuarioSeleccionado.Apellidos,
        [Validators.required],
      ],
      email: [this.datosUsuarioSeleccionado.Email, [Validators.required, Validators.email]],
      passcode: [
        '',
        [
          Validators.maxLength(50),
        ],
      ],
      confirmPasscode: [''],
      imagen: [''],
      dni: [
        this.datosUsuarioSeleccionado.DNI,
        [Validators.required, Validators.minLength(9)],
      ],
      idAdmin: ['', [Validators.required]],
    },
    {
      validator: this.mustMatch('passcode', 'confirmPasscode'),
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get form() {
    return this.modEditarUsuario.controls;
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  public togglePass() {
    if (this.passShown) {
      this.passShown = false;
      this.passType = 'password';
    } else {
      this.passShown = true;
      this.passType = 'text';
    }
  }

  public toggleConfirmPass() {
    if (this.confirmPassShown) {
      this.confirmPassShown = false;
      this.confirmPassType = 'password';
    } else {
      this.confirmPassShown = true;
      this.confirmPassType = 'text';
    }
  }

  enviar(modal: any) {
    console.log(this.datosUsuarioSeleccionado.Nombre);

    this.modalClick = true;
    this.modalService.open(modal);

    this.crearForm();
  }

  recogerDatos() {
    console.log(this.userSelecc);

    this.usersServ.obtenerUsuarioId(this.userSelecc).subscribe((val: any) => {
      this.datosUsuarioSeleccionado = val.data;
    });
    this.datosUsuario = this.tokenServ.getUsuario();
  }

  onSubmit(form: any) {
    this.submitted=true;
    if (form.valid) {

  

      console.log('Válido');
      console.log(form.idAdmin);
      

      const newUser: Usuario = {
        idUsuario: this.datosUsuarioSeleccionado.idUsuario,
        Nombre: form.nombre,
        Apellidos: form.apellidos,
        Email: form.email,
        Passcode: form.passcode,
        Imagen: this.imgSrc,
        DNI: form.dni,
        idAdmin: form.idAdmin,
      };
      this.usersServ.modificarUsuario(newUser).subscribe();
      console.log(newUser);
      
      //window.location.reload();
    } else {
      console.log(form.idAdmin);
      console.log('No es válido');
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