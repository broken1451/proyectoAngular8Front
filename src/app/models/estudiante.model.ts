import { Usuario } from '../models/usuario.model';
import { Materia } from '../models/materias.model';

export class Estudiante {
  constructor(
    public nombre?: string,
    public usuario?: Usuario,
    public materia?: Materia,
    public img?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
