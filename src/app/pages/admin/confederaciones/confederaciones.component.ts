import { Component, OnInit } from '@angular/core';
import { Confederacion } from '../../../models/confederacion.model';
import { ConfederacionesService } from '../../../services/service.index';

@Component({
  selector: 'app-confederaciones',
  templateUrl: './confederaciones.component.html',
  styles: []
})
export class ConfederacionesComponent implements OnInit {

  confederaciones: Confederacion[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Confederación";
  oculto: string = 'oculto';
  confederacion: Confederacion = new Confederacion('','','','','','','','');

  termino: boolean = false;

  constructor(
    public _confederacionesService: ConfederacionesService
  ) { }

  ngOnInit() {
    this.cargarConfederaciones();
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.confederacion = new Confederacion('','','','','','','','');
      this.cargarConfederaciones();
    }
  }

  cargarConfederaciones() {
    this._confederacionesService.cargarConfederaciones()
            .subscribe(confederaciones => this.confederaciones = confederaciones);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Confederación';
    this.confederacion = new Confederacion('','','','','','','','');

  }

  editModal(confederacion: Confederacion) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Confederación';
    this.confederacion = confederacion;

  }

}
