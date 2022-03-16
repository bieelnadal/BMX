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
import { Header2Component } from './plantillas/header2/header2.component';
import { DashboardAdminComponent } from './vistas/admin/dashboard-admin/dashboard-admin.component';
import { TablaVerificarProductosComponent } from './vistas/admin/tabla-verificar-productos/tabla-verificar-productos.component';
import { GestionUsuariosComponent } from './vistas/admin/gestion-usuarios/gestion-usuarios.component';

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
    Header2Component,
    DashboardAdminComponent,
    TablaVerificarProductosComponent,
    GestionUsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
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
