import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ContenidoComponent } from './pages/contenido/contenido.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'dashboard', descrip: 'Esto es la pagina dashboard'} },
      { path: 'home', component: HomeComponent, data: {titulo: 'Home', descrip: 'Esto es la pagina principal'} },
      { path: 'contenido', component: ContenidoComponent, data: {titulo: 'Contenido', descrip: 'Esto es la pagina del contenido'}},
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios', descrip: 'Esto es la pagina de los usuarios'}},
      { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil', descrip: 'Esto es la pagina del perfil de usuario'}},
      { path: '', pathMatch: 'full' , redirectTo: 'home' }
    ]
  },
  { path: 'login', component: LoginComponent, data: {titulo: 'Login', descrip: 'Esto es la pagina login'} },
  { path: 'register', component: RegisterComponent, data: {titulo: 'Registro', descrip: 'Esto es la pagina principal de registro'} },
  { path: '**', component: LoginComponent, data: {titulo: 'Login', descrip: 'Esto es la pagina login'} },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


