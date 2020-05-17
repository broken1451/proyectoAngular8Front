import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante.model';
import { Usuario } from '../../models/usuario.model';
import { Materia } from '../../models/materias.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
declare var $: any;


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  public estudiantes: any;
  public estudiantesnombre: any;
  public estudiantesmateria: any;
  public estudianteusuario: any;
  public materias: any;


  constructor(private estudianteService: EstudianteService, private usuarioService: UsuarioService, private materiaService: MateriasService) { }

  ngOnInit(): void {
    this.getEstudiantes();
    this.materiaService.getMaterias().subscribe((materias: Materia) => {
      this.materias = materias;
      console.log('materias: ', this.materias);
      console.log(' this.materiaService.materias: ' , this.materiaService.materias);
    });
  }


  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((estudiantes: any) => {
      this.estudiantes = estudiantes;
      this.estudiantesnombre = this.estudiantes.nombre;
      this.estudiantesmateria = this.estudiantes.materia;
      this.estudianteusuario = this.usuarioService.usuario.nombre;
      console.log('this.estudiantes: ', this.estudiantes);
    });
  }

 crearEstudiante(formulario: NgForm) {
  // console.log('formulario: ', formulario);
  if (formulario.invalid) {
    return false;
  }

  $('#exampleModal').modal('hide');

  let estudiante = new Estudiante(
    formulario.form.controls['estudiantesnombre'].value,
    this.usuarioService.usuario._id,
    formulario.form.controls['estudiantesmateria'].value
  );

  console.log('estudiante: ', estudiante);

  this.estudianteService.crearEstudiante(estudiante).subscribe((estudianteCreado: any) => {
     this.getEstudiantes();
     console.log('estudianteCreado: ', estudianteCreado);
     Swal.fire( {
       title: 'Estudiante',
       html: `${ estudianteCreado.estudianteGuardado.nombre} CREADO`,
       icon: 'success',
       confirmButtonText: 'Aceptar',
       allowEscapeKey: false,
       showCancelButton: false,
       showCloseButton: false,
       allowOutsideClick: false,
      });
     formulario.setValue({
          estudiantesnombre: '',
          estudiantesmateria: '',
          estudianteusuario: this.usuarioService.usuario.nombre
     });
   });
}

 verEstudiante(estudiante: Estudiante ) {
  Swal.fire({
    title: `Estudiante`,
    html: `<label><h2><strong>Nombre del estudiante:</strong></h2><b>${estudiante.nombre}</b></label>`,
    icon: 'info',
    iconHtml: '<i class="fas fa-info-circle"></i>',
    confirmButtonText: 'Aceptar',
    allowEscapeKey: false,
    showCancelButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
  });
 }

}
