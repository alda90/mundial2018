import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SedeService } from '../../services/sede/sede.service';
import { Sede } from '../../models/sede.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-sede',
  templateUrl: './modal-sede.component.html',
  styles: []
})
export class ModalSedeComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('sede') sede = new Sede('','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _sedeService: SedeService,
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

  guardarSede(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._sedeService.guardarSede(this.sede)
            .subscribe(sede => {

              this.termino.emit(true);
              console.log(sede);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
