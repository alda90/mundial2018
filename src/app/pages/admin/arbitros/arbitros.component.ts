import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../../../models/arbitro.model';
import { ArbitroService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';


declare function init_plugins();

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styles: []
})
export class ArbitrosComponent implements OnInit {

  arbitros: Arbitro[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Árbitro";
  oculto: string = 'oculto';
  arbitro: Arbitro = new Arbitro('','','','','');

  termino: boolean = false;

  constructor(
      public _arbitroService: ArbitroService,
      public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    init_plugins();
    this.cargarArbitros();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarArbitros());
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.arbitro = new Arbitro('','','','','');
      this.cargarArbitros();
    }
  }

  cargarArbitros() {
    this._arbitroService.cargarArbitros()
            .subscribe(arbitros => this.arbitros = arbitros);
  }

  actualizarImagen(arbitro: Arbitro) {
    this._modalUploadService.mostrarModal('arbitros', 'banderas', arbitro._id);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Árbitro';
    this.arbitro = new Arbitro('','','','','');

  }

  editModal(arbitro: Arbitro) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Árbitro';
    this.arbitro = arbitro;

  }

}
