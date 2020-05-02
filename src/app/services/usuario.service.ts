import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../../app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // public usuario: Usuario;

  constructor(private httpClient: HttpClient) { }

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
      return resLogin;
    }), catchError((err: any) => {
      console.log('err: ', err);
      return throwError(err);
    }));
  }

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
}
