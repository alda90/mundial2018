import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../models/jugador.model';
import { JugadorService } from '../../../services/jugador/jugador.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styles: []
})
export class JugadoresComponent implements OnInit {

  jugadores: Jugador[] = [];
  cargando: boolean = true;

  tituloModal: string = "Agregar Jugador";
  oculto: string = 'oculto';
  jugador: Jugador = new Jugador('','','','','','','','','','');

  termino: boolean = false;
  idpais: string;

  constructor(
    public _jugadorService: JugadorService,
    public _modalUploadService: ModalUploadService,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe(params => {
      this.idpais = params['id'];
      if(this.idpais != "") {
        this.cargarJugadores(this.idpais);
      }
    });
  }

  ngOnInit() {
    
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarJugadores(this.idpais));
  }

  terminar(termino: boolean) {
    if (termino) {
      this.oculto = 'oculto';
      this.jugador = new Jugador('','','','','','','','','','');
      this.cargarJugadores(this.idpais);
    }
  }

  cargarJugadores(id:string) {
    this._jugadorService.jugadorPorPais(id)
            .subscribe(jugadores => this.jugadores = jugadores);
  }

  addModal() {
    this.oculto = '';
    this.tituloModal = 'Nuevo Jugador';
    this.jugador = new Jugador('','','','','','','',this.idpais,'','');

  }

  editModal(jugador: Jugador) {
    this.oculto = '';
    this.tituloModal = 'Actualizar Jugador';
    this.jugador = jugador;
    this.jugador.pais = this.idpais;

  }


  actualizarImagen(jugador: Jugador) {
    this._modalUploadService.mostrarModal('jugadores', 'jugadores', jugador._id);
  }

 

}
