import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SedeService } from '../../services/sede/sede.service';
import { Sede } from '../../models/sede.model';

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

  constructor(
    public _sedeService: SedeService
  ) { }

  ngOnInit() {
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
