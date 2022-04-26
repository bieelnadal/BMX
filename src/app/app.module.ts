import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './identificacion/register/register.component';
import { LoginComponent } from './identificacion/login/login.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './plantillas/admin-header/admin-header.component';
import {PerfilAdminComponent } from './vistas/admin/perfil-admin/perfil-admin.component';
import { PerfilUsuarioComponent } from './vistas/usuario/perfil-usuario/perfil-usuario.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './vistas/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { SharkDirective } from './shark.directive';
import { EditarDatosUsuarioComponent } from './plantillas/editar-datos-usuario/editar-datos-usuario.component';
import { EditarDireccionComponent } from './plantillas/editar-direccion/editar-direccion.component';
import { PlantillaProductoComponent } from './plantillas/plantilla-producto/plantilla-producto.component';
import { EditarDireccionModalComponent } from './plantillas/editar-direccion-modal/editar-direccion-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearProductoComponent } from './vistas/usuario/crearProducto/crearProducto.component';
import { DashboardAdminComponent } from './vistas/admin/dashboard-admin/dashboard-admin.component';
import { GestionUsuariosComponent } from './vistas/admin/gestion-usuarios/gestion-usuarios.component';
import { TablaVerificarProductosComponent } from './vistas/admin/tabla-verificar-productos/tabla-verificar-productos.component';
import { EditarDatosUsuarioModalComponent } from './plantillas/editar-datos-usuario-modal/editar-datos-usuario-modal.component';
import { CarritoComponent } from './plantillas/carrito/carrito.component';
import { BorrarUsuariosComponent } from './vistas/admin/borrar-usuarios/borrar-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    PerfilAdminComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    SharkDirective,
    EditarDatosUsuarioComponent,
    EditarDireccionComponent,
    PlantillaProductoComponent,
    EditarDireccionModalComponent,
    CrearProductoComponent,
    DashboardAdminComponent,
    GestionUsuariosComponent,
    TablaVerificarProductosComponent,
    EditarDatosUsuarioModalComponent,
    CarritoComponent,
    BorrarUsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgbModule,

  ],
  providers: [

  {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
