import { Usuario } from '../models/usuario.model';
import { Materia } from '../models/materias.model';

export class Estudiante {
  constructor(
    public nombre?: string,
    public usuario?: any,
    public materia?: any,
    public img?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
