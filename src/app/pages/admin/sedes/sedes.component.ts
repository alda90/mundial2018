import { Component, OnInit } from '@angular/core';
import { Sede } from '../../../models/sede.model';
import { SedeService } from '../../../services/sede/sede.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styles: []
})
export class SedesComponent implements OnInit {


  sedes: Sede[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Sede";
  oculto: string = 'oculto';
  sede: Sede = new Sede('','','','');

  termino: boolean = false;

  constructor(
    public _sedeService: SedeService
  ) { }

  ngOnInit() {
    this.cargarSedes();
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.sede = new Sede('','','','');
      this.cargarSedes();
    }
  }

  cargarSedes() {
    this._sedeService.cargarSedes()
            .subscribe(sedes => this.sedes = sedes);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nueva Sede';
    this.sede = new Sede('','','','');

  }

  editModal(sede: Sede) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Sede';
    this.sede = sede;

  }

}
