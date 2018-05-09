import { Component, OnInit } from '@angular/core';
import { Alineacion } from '../../../models/alineacion.model';
import { AlineacionService } from '../../../services/service.index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alineaciones',
  templateUrl: './alineaciones.component.html',
  styles: []
})
export class AlineacionesComponent implements OnInit {

  alineaciones: Alineacion[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Alineación";
  oculto: string = 'oculto';
  alineacion: Alineacion = new Alineacion('','','','','','');

  termino: boolean = false;
  idpartido: string;
  idpais: string;
  
  

  constructor(
    public _alineacionService: AlineacionService,
    public activatedRoute: ActivatedRoute
    
  ) {
    activatedRoute.params.subscribe(params => {
      this.idpartido = params['id'];
      if(this.idpartido != "") {
        this.cargarJugadores(this.idpartido);
      }
    });
   }

  ngOnInit() {
    this.idpais = this._alineacionService.idpais;
    
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.alineacion = new Alineacion('','','','','','');
      this.cargarJugadores(this.idpartido);
    }
  }

  cargarJugadores(id:string) {
    this._alineacionService.obtenerAlineacion(id)
            .subscribe(jugadores => this.alineaciones = jugadores);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nueva Alineación';
    this.alineacion = new Alineacion('',this.idpartido,'N','',this.idpais,'');

  }

  editModal(alineacion: Alineacion, idjugador: string) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Alineación';
    this.alineacion = alineacion;
    this.alineacion.partido = this.idpartido;
    this.alineacion.jugador = idjugador;
    this.alineacion.pais = this.idpais;

  }


}
