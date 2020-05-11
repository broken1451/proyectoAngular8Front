import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante.model';
import { Usuario } from '../../models/usuario.model';
import { Materia } from '../../models/materias.model';
{}

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  public estudiantes: Estudiante;

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }


  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((estudiantes: Estudiante) => {
      this.estudiantes = estudiantes;
      console.log(this.estudiantes);
    });
  }

}
