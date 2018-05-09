import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Partido } from '../../models/partido.model';

@Injectable()
export class PartidoService {

  totalPartidos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarPartidos() {
    let url = URL_SERVICIOS + '/partido';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalPartidos = resp.total;
                return resp.partido;
              });
  }

  obtenerPartido (id: string) {
    let url = URL_SERVICIOS + '/partido/partido';
    let body = new HttpParams();
    body = body.set('idpartido', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.partido);
  }

  guardarPartido(partido: Partido) {
    
    
    let body = new HttpParams();
    body = body.set('partido', partido.partido);
    body = body.set('local', partido.local);
    body = body.set('visitante', partido.visitante);
    body = body.set('goleslocal', partido.goleslocal);
    body = body.set('golesvisitante', partido.golesvisitante);
    body = body.set('estatus', partido.estatus);
    body = body.set('fase', partido.fase);
    body = body.set('fecha', partido.fecha);
    body = body.set('hora', partido.hora);
    body = body.set('ganador', partido.ganador);
    body = body.set('conclusion', partido.conclusion);
    body = body.set('goleslocalp', partido.goleslocalp);
    body = body.set('golesvisitantep', partido.golesvisitantep);
    body = body.set('grupo', partido.grupo);
    body = body.set('estadio', partido.estadio);

    if (partido._id) {

      let url = URL_SERVICIOS + '/partido/' + partido._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Partido Actualizado', partido.partido, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar partido', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/partido';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Partido Creado', partido.partido, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear partido', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
