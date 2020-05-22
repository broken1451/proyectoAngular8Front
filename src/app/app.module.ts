import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './components/login/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContenidoComponent } from './pages/contenido/contenido.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { BreadcumbsComponent } from './shared/breadcumbs/breadcumbs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { EstudianteComponent } from './pages/estudiantes/estudiante.component';
import { ImagenPipe } from './pipes/imagen.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    ContenidoComponent,
    HeaderComponent,
    SidebarComponent,
    PagesComponent,
    BreadcumbsComponent,
    DashboardComponent,
    UsuariosComponent,
    ProfileComponent,
    MateriasComponent,
    EstudiantesComponent,
    EstudianteComponent,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
