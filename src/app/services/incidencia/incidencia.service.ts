import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Incidencia } from '../../models/incidencia.model';

@Injectable()
export class IncidenciaService {

  totalIncidencias: number = 0;
  partido: string;

  constructor(
    public http: HttpClient
  ) { }

  cargarIncidencias() {
    let url = URL_SERVICIOS + '/incidencia';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalIncidencias = resp.total;
                return resp.incidencia;
              });
  }

  obtenerIncidencia (id: string) {
    let url = URL_SERVICIOS + '/incidencia/partido';
    let body = new HttpParams();
    body = body.set('partido', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.incidencia);
  }


  guardarIncidencia(incidencia: Incidencia) {
 
    let body = new HttpParams();
    body = body.set('incidencia', incidencia.incidencia);
    body = body.set('minuto', incidencia.minuto);
    body = body.set('numpenal', incidencia.numpenal);
    body = body.set('partido', incidencia.partido);
    body = body.set('tecnico', incidencia.tecnico);
    body = body.set('jugador', incidencia.jugador);
    body = body.set('sustituto', incidencia.sustituto);

    if (incidencia._id) {

      let url = URL_SERVICIOS + '/incidencia/' + incidencia._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Incidencia Actualizado', incidencia.incidencia, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar incidencia', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/incidencia';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Incidencia Creado', incidencia.incidencia, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear incidencia', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
