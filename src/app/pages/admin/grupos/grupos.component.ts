import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../../models/grupo.model';
import { GrupoService } from '../../../services/grupo/grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  grupos: Grupo[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Grupo";
  oculto: string = 'oculto';
  grupo: Grupo = new Grupo('','');

  termino: boolean = false;

  constructor(
    public _grupoService: GrupoService
  ) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.grupo = new Grupo('','');
      this.cargarGrupos();
    }
  }

  cargarGrupos() {
    this._grupoService.cargarGrupos()
            .subscribe(grupos => this.grupos = grupos);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Grupo';
    this.grupo = new Grupo('','');

  }

  editModal(grupo: Grupo) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Grupo';
    this.grupo = grupo;

  }

}
