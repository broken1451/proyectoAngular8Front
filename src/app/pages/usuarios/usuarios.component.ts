import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }


  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios: any) => {
      this.usuarios = usuarios;
      console.log(usuarios);
    });
  }

  borrarUsuario(usuario: Usuario) {
      console.log(usuario._id);
      console.log(this.usuarioService.usuario._id);
      if (usuario._id  === this.usuarioService.usuario._id) {
        Swal.fire('No puede Eliminar usuario', 'No se puede eliminar el usuario logueado o a si mismo', 'error');
        return;
      }
      Swal.fire({
        title:  'Esta seguro?',
        text: 'Borrara el usurio ' + usuario.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((borrar) => {
        console.log('borrar: ', borrar);
        if (borrar.value) {
          this.usuarioService.borrarUsuario(usuario).subscribe((usuarioBorrado: any) => {
            console.log(usuarioBorrado);
            Swal.fire(
              'Borrado!',
              `El usuario ${usuarioBorrado.usuarioBorrado.nombre} ha sido eliminado`,
              'success'
            )
            this.getUsuarios();
          });
        } else if (borrar.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'El Usuario ' + usuario.nombre + ' esta a salvo :)', 'info');
        }
      });
  }

}
