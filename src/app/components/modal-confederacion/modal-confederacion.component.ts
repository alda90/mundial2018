import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Confederacion } from '../../models/confederacion.model';
import { ConfederacionesService } from '../../services/confederaciones/confederaciones.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-confederacion',
  templateUrl: './modal-confederacion.component.html',
  styles: []
})
export class ModalConfederacionComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('confederacion') confederacion = new Confederacion('','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _confederacionService: ConfederacionesService,
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

  guardarConfederacion(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._confederacionService.guardarConfederacion(this.confederacion)
            .subscribe(confederacion => {

              this.termino.emit(true);
              console.log(confederacion);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

}
