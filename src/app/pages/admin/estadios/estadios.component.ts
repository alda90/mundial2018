import { Component, OnInit } from '@angular/core';
import { Estadio } from '../../../models/estadio.model';
import { EstadioService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styles: []
})
export class EstadiosComponent implements OnInit {

  estadios: Estadio[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Estadio";
  oculto: string = 'oculto';
  estadio: Estadio = new Estadio('','','','','','','');

  termino: boolean = false;

  constructor(
    public _estadioService: EstadioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarEstadios();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarEstadios());
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.estadio = new Estadio('','','','','','','');
      this.cargarEstadios();
    }
  }

  cargarEstadios() {
    this._estadioService.cargarEstadios()
            .subscribe(estadios => this.estadios = estadios);
  }

  actualizarImagen(estadio: Estadio) {
    this._modalUploadService.mostrarModal('estadios', 'estadios', estadio._id);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Estadio';
    this.estadio = new Estadio('','','','','','','');

  }

  editModal(estadio: Estadio, idsede: string) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Estadio';
    this.estadio = estadio;
    this.estadio.sede = idsede;

  }

}
