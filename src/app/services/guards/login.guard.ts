import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.usuarioService.estaLogueado()) {
      console.log('Paso por el guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      Swal.fire({
        title:  'Bloqueado',
        text: 'Debe estar autenticado para ver el contenido',
        icon: 'warning',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      })
      console.log('Debe estar autenticado Bloqueado');
      return false;
    }
  }

}



// 'Bloqueado', 'Debe estar autenticado para ver el contenido', 'info'
