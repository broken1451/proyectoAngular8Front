import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
    // console.log(this.usuario)
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((usuarioActualizado) => {
    // this.usuarioService.actualizarUsuario(this.usuario._id).subscribe((usuarioActualizado) => {
      console.log(usuarioActualizado);
    });
  }
}
