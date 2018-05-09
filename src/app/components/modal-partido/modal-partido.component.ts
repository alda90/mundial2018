import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Partido } from '../../models/partido.model';
import { Pais } from '../../models/pais.model';
import { Grupo } from '../../models/grupo.model';
import { Estadio } from '../../models/estadio.model';
import { PartidoService } from '../../services/partido/partido.service';
import { PaisService } from '../../services/pais/pais.service';
import { GrupoService } from '../../services/grupo/grupo.service';
import { EstadioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-partido',
  templateUrl: './modal-partido.component.html',
  styles: []
})
export class ModalPartidoComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('partido') partido = new Partido('','','','','','','','','','','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  local: Pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');
  visitante: Pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');
  paises: Pais[] = [];

  grupo: Grupo = new Grupo('','');
  grupos: Grupo[] = [];

  estadio: Estadio = new Estadio('','','','','','','');
  estadios: Estadio[] = [];

  constructor(
    public _partidoService: PartidoService,
    public _paisService: PaisService,
    public _grupoService: GrupoService,
    public _estadioService: EstadioService
  ) { }

  ngOnInit() {
    this._estadioService.cargarEstadios()
        .subscribe(estadios => this.estadios = estadios);
    this._grupoService.cargarGrupos()
        .subscribe(grupos => this.grupos = grupos);
    this._paisService.cargarPaises()
        .subscribe(paises => this.paises = paises);
    
  }

  guardarPartido(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._partidoService.guardarPartido(this.partido)
            .subscribe(partido => {

              this.termino.emit(true);
              console.log(partido);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioLocal(id: string) {
    this._paisService.obtenerPais(id)
          .subscribe(local => this.local = local);
  }

  cambioVisitante(id: string) {
    this._paisService.obtenerPais(id)
          .subscribe(visitante => this.visitante = visitante);
  }
  
  cambioGrupo(id: string) {
    this._grupoService.obtenerGrupo(id)
          .subscribe(grupo => this.grupo = grupo);
  }

  cambioEstadio(id: string) {
    this._estadioService.obtenerEstadio(id)
          .subscribe(estadio => this.estadio = estadio);
  }
}
