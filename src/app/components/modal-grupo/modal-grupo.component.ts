import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GrupoService } from '../../services/grupo/grupo.service';
import { Grupo } from '../../models/grupo.model';

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

  constructor(
    public _grupoService: GrupoService
  ) { }

  ngOnInit() {
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
