import { Component, OnInit } from '@angular/core';
import { Arbitrospart } from '../../../models/arbitrospart.model';
import { ActivatedRoute } from '@angular/router';
import { ArbitrospartService } from '../../../services/arbitrospart/arbitrospart.service';

@Component({
  selector: 'app-arbitrospart',
  templateUrl: './arbitrospart.component.html',
  styles: []
})
export class ArbitrospartComponent implements OnInit {

  arbitrospart: Arbitrospart[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Arbitros al Partido";
  oculto: string = 'oculto';
  arbipart: Arbitrospart = new Arbitrospart('','','','');

  termino: boolean = false;
  idpartido: string;

  constructor(
    public _arbitrospartService: ArbitrospartService,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.idpartido = params['id'];
      if(this.idpartido != "") {
        this.cargarArbitrospart(this.idpartido);
      }
    });
   }

  ngOnInit() {
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.arbipart = new Arbitrospart('','','','');
      this.cargarArbitrospart(this.idpartido);
    }
  }

  cargarArbitrospart(id:string) {
    this._arbitrospartService.cargarArbitrosPart(id)
            .subscribe(arbitros => this.arbitrospart = arbitros);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nueva Alineación';
    this.arbipart = new Arbitrospart('',this.idpartido,'','');

  }

  editModal(arbitrospart: Arbitrospart, idarbitro: string) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Arbitro del Partido';
    this.arbipart = arbitrospart;
    this.arbipart.arbitro = idarbitro;

  }

}
