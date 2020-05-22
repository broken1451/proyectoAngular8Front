import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../../services/materias.service';
import { Materia } from 'src/app/models/materias.model';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
{}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  public materias: any;
  public loading: boolean;

  constructor(private materiaService: MateriasService, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.loading = true;
    setTimeout(() => {
      this.materiaService.getMaterias().subscribe((materias: any) => {
        if (!materias.usuario) {
          materias.forEach((element) => {
            if (element.usuario ==  null) {
              element.usuario = this.usuarioService.usuario;
            }
          });
        }
        this.materias = materias;
        this.loading = false;
        // console.log(materias);
      });
    }, 2000);
  }

  verMateria(materia: any) {
    // console.log(materia);
    Swal.fire({
      title: `Materia: ${materia.nombre}`,
      html: `<label><h2><strong>Nombre de Profesor:</strong></h2><b>${materia.usuario.nombre}</b></label>`,
      icon: 'info',
      iconHtml: '<i class="fas fa-info-circle"></i>',
      confirmButtonText: 'Aceptar',
      allowEscapeKey: false,
      showCancelButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
    });
  }


    crearMateria() {
      Swal.fire({
        title: 'Crear Materia',
        text: 'Ingrese nombre de la materia',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        // type: 'info',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((valor: any) => {
        console.log('valor: ', valor);
        let nuevaMateria = new Materia(valor.value, this.usuarioService.usuario);
        console.log('nuevaMateria: ', nuevaMateria);
        if (!nuevaMateria.nombre  || valor.length <= 0) {
          console.log('pase por aca en el if');
          return false;
        } else {
          this.materiaService.crearMateria(nuevaMateria).subscribe( (materiaCreada: any) => {
            // materiaCreada.usuario = this.usuarioService.usuario;
            this.materias.push(materiaCreada);
            this.getMaterias();
            console.log('materiaCreada: ', materiaCreada);
          });
        }
      });
    }

    actualizarMateria(materia: Materia) {
      console.log(materia);
      Swal.fire({
        title: 'Editar Materia',
        text: 'Ingrese nombre de la materia a editar',
        input: 'text',
        inputValue: `${materia.nombre}`,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        // type: 'info',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then(( valor: any) => {
        if (!valor.value  || valor.length <= 0) {
          return false;
        } else {
          materia.nombre = valor.value;
          materia.usuario = this.usuarioService.usuario;
          this.materiaService.actualizarMateria(materia).subscribe( (materiaActualizada: any) => {
            console.log('materiaActualizada: ', materiaActualizada);
          });
        }
      });
    }

    borrarMateria(materia: Materia) {
      console.log(materia);
      Swal.fire({
        title:  'Esta seguro?',
        html: `Borrara la materia: <strong>${materia.nombre}</strong>` ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        allowOutsideClick: false
      }).then((borrar) => {
        console.log('borrar: ', borrar);
        if (borrar.value) {
          this.materiaService.borrarMateria(materia).subscribe((materiaBorrada: any) => {
            console.log(materiaBorrada);
            Swal.fire(
              'Borrado!',
              `La materia ${materiaBorrada.nombre} ha sido eliminada`,
              'success'
            );
            this.getMaterias();
          });
        } else if (borrar.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'La materia ' + materia.nombre + ' no se eliminara', 'info');
        }
      });
    }
}
