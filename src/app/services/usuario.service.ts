import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../../app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
    } else {
      this.usuario = null;
      this.token = '';
    }
  }

   // Metodo de login normal de usuario
   login(usuario: Usuario, recordar?: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${environment.url}/login` ;
    return this.httpClient.post(url, usuario).pipe(map( (resLogin: any) => {
      console.log('resLogin del map: ', resLogin);
      this.guardarStorage(resLogin.id, resLogin.token, resLogin.usuarioLogin);
      return resLogin;
    }), catchError((err: any) => {
      console.log('err: ', err);
      return throwError(err);
    }));
  }

  // Metodo para saber si esta logueado el usuario y se usa con el guard
  estaLogueado() {
    // return (this.token.length > 1) ? true : false;

    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      console.log('Paso por el login guard de la funcion estaLogueado');
      return true;
    } else {
      console.log('Debe estar logueado');
      return false;
    }
}


  // obtener todos los usuario
  getUsuarios() {
    const url = `${environment.url}/usuario`;
    return this.httpClient.get(url).pipe(map((usuarios: Usuario) => {
      console.log('usuarios: ', usuarios);
      return usuarios['usuarios'];
    }));
  }

  // Crear un usuario
  crearusuario(usuario: Usuario) {
    const url = `${environment.url}/usuario`;
    return this.httpClient.post(url, usuario).pipe(map((data: any) => {
      console.log('data en crear usuario: ', data);
      Swal.fire('Usuario Creado', data.usuarioCreado.email, 'success');
      return data.usuarioCreado;
    }), catchError((err) => {
      console.log('err: ', err);
      Swal.fire(err.error.mensaje, err.error.errors.errors.email.message, 'error');
      return throwError(err);
    }));
  }

  // Actualizar un usuario

  // actualizarUsuario(id: string) { // este metodo lo actualiza solo una vez con el id
  //   const url = `${environment.url}/usuario/${id}`; 
  //   return this.httpClient.put(url, this.usuario).pipe(map((data: any) => {
  //     console.log('data:', data)
  //     this.guardarStorage(data.usuarioActualizado.id, this.token, data.usuarioActualizado);
  //     Swal.fire('Usuario Actualizado', data.usuarioActualizado.nombre, 'success');
  //     return data.usuarioActualizado;
  //   }),catchError((err: any) => {
  //     console.log('err: ', err);
  //     Swal.fire(err.error.mensaje, err.error.errors.errors.nombre.message, 'error');
  //     return throwError(err);
  //   }));
  // }


   actualizarUsuario(usuario: Usuario) {
      const url = `${environment.url}/usuario/${usuario._id}`;
      return this.httpClient.put(url, usuario).pipe(map((usuarioActualizado: any) => {
          console.log(usuarioActualizado);
          this.guardarStorage(usuarioActualizado.usuarioActualizado.id, this.token, usuarioActualizado.usuarioActualizado);
          Swal.fire('Usuario Actualizado', usuarioActualizado.usuarioActualizado.nombre, 'success');
          return usuarioActualizado.usuarioActualizado;
        }));
   }


 // Borrar un usuario
   borrarUsuario(usuario: Usuario) {
      const url = `${environment.url}/usuario/${usuario._id}`;
      return this.httpClient.delete(url);
   }

   // Metodo de logout
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
}
