import { Component, OnInit } from '@angular/core';
import { Estadistica } from '../../../models/estadistica.model';
import { EstadisticaService } from '../../../services/service.index';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {

  estadisticas: Estadistica[] = [];
  grupoA: Estadistica[] = [];
  grupoB: Estadistica[] = [];
  grupoC: Estadistica[] = [];
  grupoD: Estadistica[] = [];
  grupoE: Estadistica[] = [];
  grupoF: Estadistica[] = [];
  grupoG: Estadistica[] = [];
  grupoH: Estadistica[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Estadistica";
  oculto: string = 'oculto';
  estadistica: Estadistica = new Estadistica('','','','','','','','','','','');

  termino: boolean = false;

  constructor(
    public _estadisticaService: EstadisticaService
  ) { }

  ngOnInit() {
    this.cargarEstadisticas()
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.estadistica = new Estadistica('','','','','','','','','','','');
      this.cargarEstadisticas();
    }
  }

  cargarEstadisticas() {
    this._estadisticaService.cargarEstadisticas()
            .subscribe(estadisticas => this.estadisticas = estadisticas);
  }


  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nueva Estadistica';
    this.estadistica = new Estadistica('','','','','','','','','','','');

  }

  editModal(estadistica: Estadistica, idpais: string, idgrupo: string) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Estadistica';
    this.estadistica = estadistica;
    this.estadistica.pais = idpais;
    this.estadistica.grupo = idgrupo;

  }

}
