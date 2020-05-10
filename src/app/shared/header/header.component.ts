import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

}
