import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Estadio } from '../../models/estadio.model';
import { EstadioService } from '../../services/estadio/estadio.service';
import { SedeService } from '../../services/sede/sede.service';
import { Sede } from '../../models/sede.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-estadio',
  templateUrl: './modal-estadio.component.html',
  styles: []
})
export class ModalEstadioComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('estadio') estadio = new Estadio('','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  sede: Sede = new Sede('','','','');
  sedes: Sede[] = [];

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _estadioService: EstadioService,
    public _sedeService: SedeService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._sedeService.cargarSedes()
        .subscribe(sedes => this.sedes = sedes);

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

  guardarEstadio(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._estadioService.guardarEstadio(this.estadio)
            .subscribe(estadio => {

              this.termino.emit(true);
              console.log(estadio);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioSede(id: string) {
    this._sedeService.obtenerSede(id)
          .subscribe(sede => this.sede = sede);
  }

}
