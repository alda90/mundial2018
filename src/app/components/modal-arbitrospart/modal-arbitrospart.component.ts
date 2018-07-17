import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arbitrospart } from '../../models/arbitrospart.model';
import { Arbitro } from '../../models/arbitro.model';
import { ArbitrospartService } from '../../services/arbitrospart/arbitrospart.service';
import { ArbitroService } from '../../services/arbitro/arbitro.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-modal-arbitrospart',
  templateUrl: './modal-arbitrospart.component.html',
  styles: []
})
export class ModalArbitrospartComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('arbipart') arbipart = new Arbitrospart('','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  arbitro: Arbitro = new Arbitro('','','','','');
  arbitros: Arbitro[] = [];
  usuario: Usuario;
  admin: Boolean;

  constructor(
    public _arbitropartService: ArbitrospartService,
    public _arbitroService: ArbitroService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._arbitroService.cargarArbitros().subscribe(arbitros => this.arbitros = arbitros);
    
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

  guardarArbitropart(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._arbitropartService.guardarArbitrospart(this.arbipart)
            .subscribe(arbipart => {

              this.termino.emit(true);
              console.log(arbipart);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioArbitro(id: string) {
    this._arbitroService.obtenerArbitro(id)
          .subscribe(arbitro => this.arbitro = arbitro);
  }

}
