import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../../../models/incidencia.model';
import { IncidenciaService } from '../../../services/incidencia/incidencia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styles: []
})
export class IncidenciasComponent implements OnInit {

  incidencias: Incidencia[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Incidencia";
  oculto: string = 'oculto';
  incidencia: Incidencia = new Incidencia('','','','','','','','');

  termino: boolean = false;
  idpartido: string;


  constructor(
    public _incidenciaService: IncidenciaService,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.idpartido = params['id'];
      if(this.idpartido != "") {
        this.cargarIncidencias(this.idpartido);
      }
    });
  }

  ngOnInit() {

  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.incidencia = new Incidencia('','','','','','','','');
      this.cargarIncidencias(this.idpartido);
    }
  }

  cargarIncidencias(id: string) {
    this._incidenciaService.obtenerIncidencia(id)
            .subscribe(incidencias =>  {
              this.incidencias = incidencias;
              console.log(incidencias);
            } );
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nueva Incidencia';
    this.incidencia = new Incidencia('','','',this.idpartido,'','','','');
  }

  editModal(incidencia: Incidencia) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Incidencia';
    this.incidencia = incidencia;
    this.incidencia.partido = this.idpartido;
    this.incidencia.jugador = incidencia.jugador._id;
    this.incidencia.sustituto = incidencia.sustituto._id;
    this.incidencia.tecnico = incidencia.tecnico._id;

  }

}
