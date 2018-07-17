import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Incidencia } from '../../models/incidencia.model';
import { Jugador } from '../../models/jugador.model';
import { Alineacion } from '../../models/alineacion.model';
import { IncidenciaService } from '../../services/incidencia/incidencia.service';
import { AlineacionService, UsuarioService } from '../../services/service.index';
import { Tecnico } from '../../models/tecnico.model';
import { TecnicoService } from '../../services/tecnico/tecnico.service';
import { JugadorService } from '../../services/jugador/jugador.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-incidencia',
  templateUrl: './modal-incidencia.component.html',
  styles: []
})
export class ModalIncidenciaComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';
  @Input('idpartido') idpartido: string = '';

  @Input('incidencia') incidencia = new Incidencia('','','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  jugador: Jugador = new Jugador('','','','','','','','','','');
  sustituto: Jugador = new Jugador('','','','','','','','','','');
  tecnico: Tecnico = new Tecnico('','','','','','','','','');
  
  tecnicos: Tecnico[] = [];
  alineaciones: Alineacion[] = [];

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _incidenciaService: IncidenciaService,
    public _alineacionService: AlineacionService,
    public _tecnicoService: TecnicoService,
    public _jugadorService: JugadorService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._alineacionService.obtenerByPartido(this.idpartido)
        .subscribe(alineaciones => this.alineaciones = alineaciones);
    this._tecnicoService.cargarTecnicos()
        .subscribe(tecnicos => this.tecnicos = tecnicos);

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

  guardarIncidencia(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._incidenciaService.guardarIncidencia(this.incidencia)
            .subscribe(incidencia => {

              this.termino.emit(true);
              console.log(this.incidencia);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioJugador(id: string) {
    this._jugadorService.obtenerJugador(id)
          .subscribe(jugador =>   this.jugador = jugador );
  }

  cambioSustituto(id: string) {
    this._jugadorService.obtenerJugador(id)
          .subscribe(jugador => this.sustituto = jugador);
  }

  cambioTecnico(id: string) {
    this._tecnicoService.obtenerTecnico(id)
          .subscribe(tecnico => this.tecnico = tecnico);
  }

}
