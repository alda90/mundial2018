import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arbitro } from '../../models/arbitro.model';
import { ArbitroService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-arbitro',
  templateUrl: './modal-arbitro.component.html',
  styles: []
})
export class ModalArbitroComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('arbitro') arbitro = new Arbitro('','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  usuario: Usuario;
  admin: Boolean;
  

  constructor(
    public _arbitroService: ArbitroService,
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

  guardarArbitro(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._arbitroService.guardarArbitro(this.arbitro)
            .subscribe(arbitro => {

              this.termino.emit(true);
              console.log(arbitro);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
