import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "../../services/usuario.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;

  @ViewChild('barraProgreso', {static: true}) barraProgreso: ElementRef;
  @ViewChild('customFile', {static: true}) customFile: ElementRef;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
    this.loading = false;
    this.cont = 0;
  }

  ngOnInit(): void {
    // console.log('this.barraProgreso: ', this.barraProgreso);
    // console.log('this.customFile: ', this.customFile);
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((usuarioActualizado) => {
        // console.log(usuarioActualizado);
    });
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo se permiten imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    // si recibimmos un archivo
    this.imagenSubir = archivo;

  // Cargar imagen temporal
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenSubirTemp = reader.result;
      // console.log(reader.result);
    };
    // console.log(archivo);
  }

  cambiarImagen() {
    // var barra = document.getElementsByClassName('progress');
    this.loading = true;
    let interval =  setInterval(() => {
      this.loading = true;
      if (this.cont < 100) {
        // console.log(' this.cont primer if ', this.cont);
        this.cont = this.cont + 20;
        this.barraProgreso.nativeElement.style.width = this.cont + '%';
        this.barraProgreso.nativeElement.innerHTML = this.cont + '%';
        if (this.cont >= 100) {
          // console.log(' this.cont segundo if ', this.cont);
          this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
          this.imagenSubirTemp = null;
          this.imagenSubir =  null;
        }
      }
      // console.log('this.cont < 100 en interval', this.cont);
      if (this.cont === 100) {
        // console.log('this.cont this.cont === 100', this.cont);
        clearInterval(interval);
        this.cont = 0;
        // this.barraProgreso.nativeElement.style.width = this.cont + '%';
        // this.barraProgreso.nativeElement.innerHTML = this.cont + '%';
        this.customFile.nativeElement.value = '';
        // console.log('this.customFile: ', this.customFile);
       }
    }, 1000);

  }

}
