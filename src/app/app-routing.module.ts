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
import { GestorProductosVistaUsuarioComponent } from './vistas/usuario/gestor-productos-vista-usuario/gestor-productos-vista-usuario.component';
import { PlantillaSubastaComponent } from './plantillas/plantilla-subasta/plantilla-subasta.component';
import { GuardService } from './services/guard/guard.service';
import { CrearSubastaComponent } from './vistas/usuario/crear-subasta/crear-subasta.component';
import { PoliticasComponent } from './plantillas/politicas/politicas.component';
import { SobreNosotrosComponent } from './plantillas/sobre-Nosotros/sobre-Nosotros.component';
import { GestionSubastasComponent } from './vistas/admin/gestion-subastas/gestion-subastas.component';
import { EditarSubastaModalComponent } from './vistas/editar-subasta-modal/editar-subasta-modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent, canActivate:[GuardService] },
  { path: 'footer', component: FooterComponent },
  { path: 'admin-header', component: AdminHeaderComponent, canActivate:[GuardService] },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent,  canActivate:[GuardService]},
  { path: 'perfil-admin', component: PerfilAdminComponent, canActivate:[GuardService] },
  { path: 'home', component: HomeComponent },
  { path: 'editar-direccion', component: EditarDireccionComponent, canActivate:[GuardService] },
  { path: 'producto/:nombre/:id', component: PlantillaProductoComponent, canActivate:[GuardService] },
  { path: 'crear-Producto', component: CrearProductoComponent,canActivate:[GuardService]  },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate:[GuardService] },
  { path: 'carrito/:id', component: CarritoComponent, canActivate:[GuardService] },
  { path: 'borrar-usuarios', component: BorrarUsuariosComponent, canActivate:[GuardService] },
  { path: 'gestion-productos', component: GestionProductosComponent, canActivate:[GuardService] },
  { path: 'historial-ventas', component: HistorialVentasComponent, canActivate:[GuardService]},
  { path: 'gestion-prodcutos-Usuario', component: GestorProductosVistaUsuarioComponent, canActivate:[GuardService]},
  { path: 'subasta', component: PlantillaSubastaComponent,canActivate:[GuardService] },
  { path: 'crear-Subasta', component: CrearSubastaComponent, canActivate:[GuardService]},
  { path: 'politicas-privacidad', component: PoliticasComponent},
  { path: 'sobre-nosotros', component: SobreNosotrosComponent},
  { path: 'gestion-subastas', component: GestionSubastasComponent},
  { path: 'editar-subasta-modal', component:EditarSubastaModalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
