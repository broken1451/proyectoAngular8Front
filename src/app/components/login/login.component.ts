import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public email: string;
  public password: string;
  public recuerdame: boolean;

  constructor(private usuarioService: UsuarioService, private router: Router) { 
    this.email = '';
    this.password = '';
    this.recuerdame = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.recuerdame = true;
    } else {
      this.email = '';
      this.recuerdame = false;
    }
  }


  ingresar(formulario: NgForm) {
    // this.router.navigate(['/dashboard']);
    // console.log('Ingresando...');
    if (formulario.invalid) {
      return;
    }

    let usuario = new Usuario(null, formulario.value.email, formulario.value.password);

    this.usuarioService.login(usuario, formulario.value.recuerdame).subscribe( (usuarioLogin: Usuario) => {
      this.router.navigate(['/dashboard']);
      console.log('usuarioLogin: ', usuarioLogin);
      // console.log('formulario.value.recuerdame: ', formulario.value.recuerdame);
    });

    console.log('Formulario valido: ', formulario.valid);
    console.log('Formulario valor: ', formulario.value);
  }



}
