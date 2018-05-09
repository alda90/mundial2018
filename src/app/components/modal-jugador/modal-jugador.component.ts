import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador/jugador.service';

@Component({
  selector: 'app-modal-jugador',
  templateUrl: './modal-jugador.component.html',
  styles: []
})
export class ModalJugadorComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('jugador') jugador = new Jugador('','','','','','','','','','');
  @Input('pais') pais: string = '';

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public _jugadorService: JugadorService
  ) { }

  ngOnInit() {
  }

  guardarJugador(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._jugadorService.guardarJugador(this.jugador)
            .subscribe(jugador => {

              this.termino.emit(true);
              console.log(jugador);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
