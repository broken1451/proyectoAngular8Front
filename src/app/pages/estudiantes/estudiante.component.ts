import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from '../../models/estudiante.model';
import { Materia } from '../../models/materias.model';
import { EstudianteService } from '../../services/estudiante.service';
import { MateriasService } from '../../services/materias.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  public estudiante: Estudiante;
  public estudianteNombre: any;
  public estudianteMateria: any;
  public estudianteProfesor: any;
  public materias: any;
  public studentMateria: any;

  constructor(private activateRoute: ActivatedRoute, private estudianteService: EstudianteService, private materiaService: MateriasService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((parametrosURL) => {
      // console.log('parametrosURL: ', parametrosURL );
      this.getEstudiante(parametrosURL['id']);
    });

    this.materiaService.getMaterias().subscribe((materias: Materia) => {
      this.materias = materias;
    });
  }

  getEstudiante(id: string) {
    this.estudianteService.getEstudiante(id).subscribe((estudiante: any) => {
      if (!estudiante.estudianteID.usuario) {
        estudiante.estudianteID.usuario = this.usuarioService.usuario;
      }
      this.estudiante = estudiante.estudianteID;
      this.studentMateria = estudiante.estudianteID.materia._id;
      this.estudianteNombre = estudiante.estudianteID.nombre;
      this.estudianteMateria = estudiante.estudianteID.materia.nombre;
      this.estudianteProfesor = estudiante.estudianteID.usuario.nombre;
    });
  }

  cambioSelectMateria(id: string) {
    // console.log('id: ' , id);
    this.materiaService.getMateria(id).subscribe((materia: any) => {
      this.materias = materia.materiaID.nombre;
      // console.log('materia: ' , materia.materiaID);
      // console.log('id: ' , id);
    });
  }

  guardar(estudiante: Estudiante) {
    // console.log('estudiante: ', estudiante);
    this.estudiante.nombre = this.estudianteNombre;
    this.estudiante.usuario = this.usuarioService.usuario._id;
    this.estudiante.materia = this.studentMateria;
    // console.log(' this.estudiante.nombre: ' ,  this.estudiante.nombre);
    // console.log(' this.estudiante.usuario: ' , this.estudiante.usuario);
    // console.log(' this.estudiante.materia: ' , this.estudiante.materia);
    this.estudianteService.actualizarEstudiante(this.estudiante).subscribe((estudianteActualizado: any) => {
      // console.log('estudianteActualizado: ' , estudianteActualizado);
      Swal.fire({
        title: `Estudiante
                ${estudianteActualizado.estudianteActualizado.nombre}
                actualizado`,
        icon: 'info',
        iconHtml: '<i class="fas fa-info-circle"></i>',
        confirmButtonText: 'Aceptar',
        allowEscapeKey: false,
        showCancelButton: false,
        showCloseButton: false,
        allowOutsideClick: false,
      });
    });
  }
}
