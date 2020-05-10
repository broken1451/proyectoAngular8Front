import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Materia} from '../models/materias.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private httpclient: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
    console.log( this.usuarioService.usuario);
  }


  getMaterias() {
    const url = `${environment.url}/materia`;
    return this.httpclient.get(url).pipe(map((materias: Materia) => {
      // tslint:disable-next-line: no-string-literal
      return materias['materias'];
    }));
  }

  crearMateria(materia: Materia) {
    const url = `${environment.url}/materia`;
    return this.httpclient.post(url, materia).pipe(map(( materias: Materia) => {
      return materias['materiaGuardada'];
    }));
  }

  actualizarMateria(materia: Materia) {
    const url = `${environment.url}/materia/${materia._id}`;
    return this.httpclient.put(url, materia).pipe(map((materiaActualizada: Materia) => {
      return materiaActualizada['materiaActualizada'];
    }));
  }

  borrarMateria(materia: Materia) {
    const url = `${environment.url}/materia/${materia._id}`;
    return  this.httpclient.delete(url).pipe(map((materiaborrada: Materia) => {
      return materiaborrada['materiaBorrada'];
    }));
  }

}
