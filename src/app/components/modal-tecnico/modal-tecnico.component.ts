import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tecnico } from '../../models/tecnico.model';
import { TecnicoService } from '../../services/tecnico/tecnico.service';

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

  constructor(
    public _tecnicoService: TecnicoService
  ) { }

  ngOnInit() {
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
