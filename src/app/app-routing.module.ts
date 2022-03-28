import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './identificacion/login/login.component';
import { RegisterComponent } from './identificacion/register/register.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { AdminHeaderComponent } from './plantillas/admin-header/admin-header.component';
import { PerfilUsuarioComponent } from './vistas/usuario/perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './vistas/admin/perfil-admin/perfil-admin.component';
import { HomeComponent } from './vistas/home/home.component';
import { EditarDatosUsuarioComponent } from './plantillas/editar-datos-usuario/editar-datos-usuario.component';
import { EditarDireccionComponent } from './plantillas/editar-direccion/editar-direccion.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin-header', component: AdminHeaderComponent},
  { path: 'perfil-usuario', component: PerfilUsuarioComponent},
  { path: 'perfil-admin', component: PerfilAdminComponent},
  { path: 'home', component: HomeComponent},
  { path: 'editar-datos-usuarios', component: EditarDatosUsuarioComponent},
  { path: 'editar-direccion', component: EditarDireccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
