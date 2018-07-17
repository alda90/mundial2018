import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GrupoService } from '../../services/grupo/grupo.service';
import { Grupo } from '../../models/grupo.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-grupo',
  templateUrl: './modal-grupo.component.html',
  styles: []
})
export class ModalGrupoComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('grupo') grupo = new Grupo('','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _grupoService: GrupoService,
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

  guardarGrupo(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._grupoService.guardarArbitro(this.grupo)
            .subscribe(grupo => {

              this.termino.emit(true);
              console.log(grupo);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
