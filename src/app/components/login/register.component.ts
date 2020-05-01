import { Component, OnInit } from '@angular/core';

// Servicios y modulos
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

// SweetAlert
import Swal from 'sweetalert2';

// Rutas
import { Router } from '@angular/router';

// Modelo
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formulario: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  sonIguales(campo1: string, campo2: string) {
    // Retornar una funcion
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      // console.log({ grupo: group});
      // console.log({ clave1: pass1});
      // console.log({ clave2: pass2});

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }

  ngOnInit(): void {
    this.formulario = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        correo: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        condiciones: new FormControl(false, [Validators.required]),
      },
      // Validacion de todo el formulario
      // {validators: funcion}
      { validators: this.sonIguales('password', 'password2') }
    );

    this.formulario.setValue({
      nombre: 'Adrian',
      correo: 'adrianbravo45@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  registrarUsuario() {
    // console.log(this.formulario);
    if (this.formulario.invalid) {
      return;
    }

    if (!this.formulario.value.condiciones) {
      Swal.fire('Importante!', 'Debe aceptar las condiciones!', 'warning');
      console.log('Acepta las condiciones: ', this.formulario.value.condiciones);
      return;
    }

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password,
    );

    this.usuarioService.crearusuario(usuario).subscribe((usuarioCreado) => {
      console.log('usuarioCreado: ', usuarioCreado);
      this.router.navigate(['/login']);
    });

  }
}
