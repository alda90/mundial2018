import { Component, OnInit } from '@angular/core';
import { Pais } from '../../../models/pais.model';
import { PaisService } from '../../../services/pais/pais.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  paises: Pais[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar País";
  oculto: string = 'oculto';
  pais: Pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');

  termino: boolean = false;

  constructor(
    public _paisService: PaisService,
    public _modalUploadService: ModalUploadService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarPaises();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarPaises());
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.pais= new Pais('','','','','','','','','','','','','','','','','','','','','','');
      this.cargarPaises();
    }
  }

  cargarPaises() {
    this._paisService.cargarPaises()
            .subscribe(paises => this.paises = paises);
  }

  actualizarBandera(pais: Pais) {
    this._modalUploadService.mostrarModal('paises', 'banderas', pais._id);
  }

  actualizarEscudoFed(pais: Pais) {
    this._modalUploadService.mostrarModal('paises', 'escudosfed', pais._id);
  }

  actualizarEscudo(pais: Pais) {
    this._modalUploadService.mostrarModal('paises', 'escudos', pais._id);
  }

  actualizarUniforme(pais: Pais) {
    this._modalUploadService.mostrarModal('paises', 'uniforme', pais._id);
  }

  actualizarUniformeV(pais: Pais) {
    this._modalUploadService.mostrarModal('paises', 'uniformev', pais._id);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo País';
    this.pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');

  }

  editModal(pais: Pais) {
    this.oculto = '';
    this.tituloModal = 'Actualizar País';
    this.pais = pais;
    this.pais.tecnico = pais.tecnico._id;
    this.pais.confederacion = pais.confederacion._id;

  }

}
