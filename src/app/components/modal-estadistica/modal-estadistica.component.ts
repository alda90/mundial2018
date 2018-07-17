import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Estadistica } from '../../models/estadistica.model';
import { Pais } from '../../models/pais.model';
import { Grupo } from '../../models/grupo.model';
import { EstadisticaService } from '../../services/estadistica/estadistica.service';
import { PaisService } from '../../services/pais/pais.service';
import { GrupoService } from '../../services/grupo/grupo.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-estadistica',
  templateUrl: './modal-estadistica.component.html',
  styles: []
})
export class ModalEstadisticaComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('estadistica') estadistica = new Estadistica('','','','','','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  pais: Pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');
  paises: Pais[] = [];

  grupo: Grupo = new Grupo('','');
  grupos: Grupo[] = [];

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _estadisticaService: EstadisticaService,
    public _paisService: PaisService,
    public _grupoService: GrupoService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._paisService.cargarPaises()
        .subscribe(paises => this.paises = paises);
    this._grupoService.cargarGrupos()
        .subscribe(grupos => this.grupos = grupos);

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

  guardarEstadistia(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._estadisticaService.guardarEstadistica(this.estadistica)
            .subscribe(estadistica => {

              this.termino.emit(true);
              console.log(estadistica);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioPais(id: string) {
    this._paisService.obtenerPais(id)
          .subscribe(pais => this.pais = pais);
  }

  cambioGrupo(id: string) {
    this._grupoService.obtenerGrupo(id)
          .subscribe(grupo => this.grupo = grupo);
  }

}
