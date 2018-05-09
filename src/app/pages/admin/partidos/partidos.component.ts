import { Component, OnInit } from '@angular/core';
import { Partido } from '../../../models/partido.model';
import { PartidoService } from '../../../services/partido/partido.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';
import { AlineacionService } from '../../../services/service.index';
import { IncidenciaService } from '../../../services/incidencia/incidencia.service';
import { ArbitrospartService } from '../../../services/arbitrospart/arbitrospart.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styles: []
})
export class PartidosComponent implements OnInit {

  partidos: Partido[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Partidos";
  oculto: string = 'oculto';
  partido: Partido = new Partido('','','','','','','','','','','','','','','','');

  termino: boolean = false;

  constructor(
    public _partidoService: PartidoService,
    public router: Router,
    public _alineacionService: AlineacionService,
    public _incidenciaService: IncidenciaService,
    public _arbitrospartService: ArbitrospartService
  ) { }

  ngOnInit() {
    this.cargarPartidos();
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.partido = new Partido('','','','','','','','','','','','','','','','');
      this.cargarPartidos();
    }
  }

  cargarPartidos() {
    this._partidoService.cargarPartidos()
            .subscribe(partidos => this.partidos = partidos);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Partido';
    this.partido = new Partido('','','','','','','','','','','','','','','','');

  }

  editModal(partido: Partido, idlocal: string, idvisitante: string, idgrupo: string, idestadio: string) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Partido';
    this.partido = partido;
    this.partido.local = idlocal;
    this.partido.visitante = idvisitante;
    this.partido.grupo = idgrupo;
    this.partido.estadio = idestadio;

  }

  navigate(ruta: string, id: string, idpais: string, partido: string, pais: string) {

      this._alineacionService.idpais = idpais;
      this._alineacionService.partido = partido;
      this._alineacionService.pais = pais;
      this.router.navigate(['/admin/' + ruta, id] );
    
  }

  navigateInc(ruta: string, id: string, partido: string) {

    this._incidenciaService.partido = partido;
    this._arbitrospartService.partido = partido;
    this.router.navigate(['/admin/' + ruta, id] );
  }
 

}
