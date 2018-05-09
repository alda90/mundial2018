import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Jugador } from '../../models/jugador.model';

@Injectable()
export class JugadorService {

  totalJugadores: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarJugadores() {
    let url = URL_SERVICIOS + '/jugador';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalJugadores = resp.total;
                return resp.jugador;
              });
  }

  obtenerJugador (id: string) {
    let url = URL_SERVICIOS + '/jugador/jugador';
    let body = new HttpParams();
    body = body.set('idjugador', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.jugador);
  }

  jugadorPorPais (id: string) {
    let url = URL_SERVICIOS + '/jugador/pais';
    let body = new HttpParams();
    body = body.set('idpais', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.jugador);
  }

  guardarJugador(jugador: Jugador) {
    
    
    let body = new HttpParams();
    body = body.set('nombre', jugador.nombre);
    body = body.set('pais', jugador.pais);
    body = body.set('numero', jugador.numero);
    body = body.set('posicion', jugador.posicion);
    body = body.set('nacimiento', jugador.nacimiento);
    body = body.set('fechanac', jugador.fechanac);
    body = body.set('nombrecompleto', jugador.nombrecompleto);
    body = body.set('nombrelocal', jugador.nombrelocal);

    if (jugador._id) {

      let url = URL_SERVICIOS + '/jugador/' + jugador._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Jugador Actualizado', jugador.nombre, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar jugador', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/jugador';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Jugador Creado', jugador.nombre, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear jugador', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}