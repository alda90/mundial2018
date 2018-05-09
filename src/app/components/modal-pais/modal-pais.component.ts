import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tecnico } from '../../models/tecnico.model';
import { Confederacion } from '../../models/confederacion.model';
import { PaisService } from '../../services/pais/pais.service';
import { TecnicoService } from '../../services/tecnico/tecnico.service';
import { ConfederacionesService } from '../../services/service.index';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-modal-pais',
  templateUrl: './modal-pais.component.html',
  styles: []
})
export class ModalPaisComponent implements OnInit {

  @Input('titulo') titulo: string = 'Título';
  @Input('oculto') oculto: string = '';

  @Input('pais') pais = new Pais('','','','','','','','','','','','','','','','','','','','','','');

  @Output('termino') termino: EventEmitter<boolean> = new EventEmitter();

  tecnico: Tecnico = new Tecnico('','','','','','','','','');
  tecnicos: Tecnico[] = [];

  confederacion: Confederacion = new Confederacion('','','','','','','','');
  confederaciones: Confederacion[] = [];

  constructor(
    public _paisService: PaisService,
    public _tecnicoService: TecnicoService,
    public _confederacionService: ConfederacionesService
  ) { }

  ngOnInit() {
    this._tecnicoService.cargarTecnicos()
        .subscribe(tecnicos => this.tecnicos = tecnicos);

    this._confederacionService.cargarConfederaciones()
          .subscribe(confederaciones => this.confederaciones = confederaciones);
  }

  guardarPais(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._paisService.guardarPais(this.pais)
            .subscribe(pais => {

              this.termino.emit(true);
              console.log(pais);
            });
  }

  cerrarModal() {
    this.termino.emit(true);
  }

  cambioTecnico(id: string) {
    this._tecnicoService.obtenerTecnico(id)
          .subscribe(tecnico => this.tecnico = tecnico);
  }

  cambioConfederacion(id: string) {
    this._confederacionService.obtenerConfederacion(id)
          .subscribe(confederacion => this.confederacion = confederacion);
  }
}
