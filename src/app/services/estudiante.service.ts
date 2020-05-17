import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { MateriasService } from './materias.service';
import { Materia } from '../models/materias.model';
import { Usuario } from '../models/usuario.model';
import { Estudiante } from '../models/estudiante.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService, private materiaservice: MateriasService) { }

  getEstudiantes() {
    const url = `${environment.url}/estudiante`;
    return this.httpClient.get(url).pipe(map((estudiantes: Estudiante) => {
      return estudiantes['estudiantes'];
    }));
  }

  getEstudiante(id: string) {
    const url = `${environment.url}/estudiante/${id}`;
    return this.httpClient.get(url).pipe(map((estudiante: Estudiante) => {
      return estudiante;
    }));
  }

  crearEstudiante(estudiante: Estudiante) {
    const url = `${environment.url}/estudiante`;
    return this.httpClient.post(url, estudiante).pipe(map((student: Estudiante) => {
      return student;
    }));
  }

}
