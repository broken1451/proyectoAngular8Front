import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from '../../models/estudiante.model';
import { Materia } from '../../models/materias.model';
import { EstudianteService } from '../../services/estudiante.service';
import { MateriasService } from '../../services/materias.service';

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

  constructor(private activateRoute: ActivatedRoute, private estudianteService: EstudianteService, private materiaService: MateriasService) { }

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
      this.estudiante = estudiante.estudianteID;
      this.studentMateria = estudiante.estudianteID.materia._id;
      this.estudianteNombre = estudiante.estudianteID.nombre;
      this.estudianteMateria = estudiante.estudianteID.materia.nombre;
      this.estudianteProfesor = estudiante.estudianteID.usuario.nombre;
      console.log(' this.estudiante: ',  this.estudiante );
    });
  }



  cambioSelectMateria(id: string) {
    console.log('id: ' , id);
    this.materiaService.getMateria(id).subscribe((materia: any) => {
      this.materias = materia.materiaID.nombre;
      console.log('materia: ' , materia.materiaID);
      console.log('id: ' , id);
    });
  }


}
