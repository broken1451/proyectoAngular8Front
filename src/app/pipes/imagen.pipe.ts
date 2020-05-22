import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

{}

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // transform(imagen: string, tipoImagen: string = 'usuarios'): unknown {
  // transform(imagen: string, tipoImagen?: string): unknown {
  transform(imagen: string, tipoImagen: string = 'usuario') {
    // console.log('imagen: PIPE ', imagen);
    // console.log('tipoImagen: PIPE', tipoImagen);
    let url = `${environment.url}/img`;
    // console.log('url: PIPE', url);
    if (!imagen) {
      return `${url}/usuario/xxx`;
    }

    if (tipoImagen == 'usuario') {
      url = `${url}/usuario/${imagen}`;
    } else if (tipoImagen === 'estudiante') {
      url = `${url}/estudiante/${imagen}`;
    } else {
     url = `${url}/usuario/xxx`;
   }
    return url;
  }

}
