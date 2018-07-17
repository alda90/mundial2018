import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tecnico } from '../../models/tecnico.model';
import { TecnicoService } from '../../services/tecnico/tecnico.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-tecnico',
  templateUrl: './modal-tecnico.component.html',
  styles: []
})
export class ModalTecnicoComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('tecnico') tecnico = new Tecnico('','','','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _tecnicoService: TecnicoService,
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

  guardarTecnico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._tecnicoService.guardarTecnico(this.tecnico)
            .subscribe(tecnico => {

              this.termino.emit(true);
              console.log(tecnico);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
