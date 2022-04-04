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
