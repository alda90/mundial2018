import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tabla: string;
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tabla = null;
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tabla: string, tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
    this.tabla = tabla;
  }

}
