import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alineacion } from '../../models/alineacion.model';
import { Jugador } from '../../models/jugador.model';
import { AlineacionService } from '../../services/alineacion/alineacion.service';
import { JugadorService } from '../../services/jugador/jugador.service';

@Component({
  selector: 'app-modal-alineacion',
  templateUrl: './modal-alineacion.component.html',
  styles: []
})
export class ModalAlineacionComponent implements OnInit {
  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';
  @Input('idpais') idpais: string = '';

  @Input('alineacion') alineacion = new Alineacion('','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  jugador: Jugador = new Jugador('','','','','','','','','','');
  jugadores: Jugador[] = [];

  constructor(
    public _alineacionService: AlineacionService,
    public _jugadorService: JugadorService
  ) { }

  ngOnInit() {
    this._jugadorService.jugadorPorPais(this.idpais)
        .subscribe(jugadores => this.jugadores = jugadores);
  }

  guardarAlineacion(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._alineacionService.guardarAlineacion(this.alineacion)
            .subscribe(alineacion => {

              this.termino.emit(true);
              console.log(this.alineacion);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioJugador(id: string) {
    this._jugadorService.obtenerJugador(id)
          .subscribe(jugador => this.jugador = jugador);
  }

}
