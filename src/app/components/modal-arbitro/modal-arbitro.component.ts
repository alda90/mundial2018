import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arbitro } from '../../models/arbitro.model';
import { ArbitroService } from '../../services/service.index';

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

  constructor(
    public _arbitroService: ArbitroService
  ) { }

  ngOnInit() {
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
