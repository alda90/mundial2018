import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alineacion } from '../../models/alineacion.model';
import { Jugador } from '../../models/jugador.model';
import { AlineacionService } from '../../services/alineacion/alineacion.service';
import { JugadorService } from '../../services/jugador/jugador.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

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
  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _alineacionService: AlineacionService,
    public _jugadorService: JugadorService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._jugadorService.jugadorPorPais(this.idpais)
        .subscribe(jugadores => this.jugadores = jugadores);

    this.usuario = this._usuarioService.usuario;
    if (this.usuario === null) {
      this.admin = false;
    } else {
      if (this.usuario.tipo === 'ADMINISTRADOR') {

        this.admin = true;
      } else {
        this.admin = false;
      }
    }
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
