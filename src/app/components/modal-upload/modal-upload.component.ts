import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, UsuarioService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _subirchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
          if (this.usuario === null) {
            this.admin = false;
          } else {
            if (this.usuario.tipo === 'ADMINISTRADOR') {
      
              this.admin = true;
            } else {
              this.admin = false;
            }
          }
  }

  subirImagen() {
    this._subirchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tabla,
      this._modalUploadService.tipo, this._modalUploadService.id)
          .then( resp => {
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
          })
          .catch(err => {
            console.log('Error en la carga');
          });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImage(archivo) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0 ){
      swal('Sólo imagenes', 'el archivo no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

}
