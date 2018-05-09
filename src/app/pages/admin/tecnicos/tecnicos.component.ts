import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../models/tecnico.model';
import { TecnicoService } from '../../../services/tecnico/tecnico.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styles: []
})
export class TecnicosComponent implements OnInit {

  tecnicos: Tecnico[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Técnico";
  oculto: string = 'oculto';
  tecnico: Tecnico = new Tecnico('','','','','','','','');

  termino: boolean = false;

  constructor(
    public _tecnicoService: TecnicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarTecnicos();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarTecnicos());
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.tecnico = new Tecnico('','','','','','','','');
      this.cargarTecnicos();
    }
  }

  cargarTecnicos() {
    this._tecnicoService.cargarTecnicos()
            .subscribe(tecnicos => this.tecnicos = tecnicos);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Técnico';
    this.tecnico = new Tecnico('','','','','','','','');

  }

  editModal(tecnico: Tecnico) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Técnico';
    this.tecnico = tecnico;

  }

  actualizarBandera(tecnico: Tecnico) {
    this._modalUploadService.mostrarModal('tecnicos', 'banderas', tecnico._id);
  }

  actualizarImagen(tecnico: Tecnico) {
    this._modalUploadService.mostrarModal('tecnicos', 'tecnicos', tecnico._id);
  }

}
