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
import { EditarDireccionComponent } from './plantillas/editar-direccion/editar-direccion.component';
import { PlantillaProductoComponent } from './plantillas/plantilla-producto/plantilla-producto.component';
import { CrearProductoComponent } from './vistas/usuario/crearProducto/crearProducto.component';
import { DashboardAdminComponent } from './vistas/admin/dashboard-admin/dashboard-admin.component';
import { CarritoComponent } from './plantillas/carrito/carrito.component';
import { BorrarUsuariosComponent } from './vistas/admin/borrar-usuarios/borrar-usuarios.component';
import { GestionProductosComponent } from './vistas/admin/gestion-productos/gestion-productos.component';
import { HistorialVentasComponent } from './vistas/usuario/historialVentas/historialVentas.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin-header', component: AdminHeaderComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent },
  { path: 'perfil-admin', component: PerfilAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'editar-direccion', component: EditarDireccionComponent },
  { path: 'producto/:nombre/:id', component: PlantillaProductoComponent },
  { path: 'crear-Producto', component: CrearProductoComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'carrito/:id', component: CarritoComponent },
  { path: 'borrar-usuarios', component: BorrarUsuariosComponent },
  { path: 'gestion-productos', component: GestionProductosComponent },
  { path: 'historial-ventas', component: HistorialVentasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
