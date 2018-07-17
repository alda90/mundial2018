import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador/jugador.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

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

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _jugadorService: JugadorService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
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
