import { Usuario } from 'src/app/models/usuario.model';
export class Materia {

    constructor(
        public nombre: string,
        public usuario: Usuario,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }

}
