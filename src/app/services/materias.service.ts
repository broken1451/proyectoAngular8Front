import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Materia } from '../models/materias.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  public materias: Materia;
  constructor(private httpclient: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.cargarStorage();
    console.log( this.usuarioService.usuario);
    this.getMaterias();
  }


  getMaterias() {
    const url = `${environment.url}/materia`;
    return this.httpclient.get(url).pipe(map((materias: Materia) => {
      // tslint:disable-next-line: no-string-literal
      this.materias = materias['materias'];
      return materias['materias'];
    }));
  }

  getMateria(id: string) {
    // /materia/5eb77a68f4c9330c8c0fdaf4
    const url = `${environment.url}/materia/${id}`;
    return this.httpclient.get(url).pipe(map((materia: Materia) => {
      // tslint:disable-next-line: no-string-literal
      return materia;
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
