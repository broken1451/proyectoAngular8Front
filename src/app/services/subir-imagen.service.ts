import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
{}

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor() { }

  subirImagen(archivo: File, tipo: string, id: string) {

    return  new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
       // Configuracion del formData
        // formData.append('nombre q esta en el postman opcion fromdata para subir la imagens', archivo que quiero subir, nombre del archivo)
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          // console.log('xhr.readyState: ', xhr.readyState);
          // console.log('xhr: ', xhr);
          if (xhr.status == 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url = `${environment.url}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
