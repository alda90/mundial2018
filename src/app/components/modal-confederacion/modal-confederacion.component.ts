import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Confederacion } from '../../models/confederacion.model';
import { ConfederacionesService } from '../../services/confederaciones/confederaciones.service';

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

  constructor(
    public _confederacionService: ConfederacionesService
  ) { }

  ngOnInit() {
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
