import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Estadistica } from '../../models/estadistica.model';

@Injectable()
export class EstadisticaService {

  totalEstadisticas: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarEstadisticas() {
    let url = URL_SERVICIOS + '/estadistica/grupos';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalEstadisticas = resp.total;
                return resp.estadistica;
              });
  }
 

  guardarEstadistica(estadistica: Estadistica) {
    
    
    let body = new HttpParams();
    body = body.set('partidos', estadistica.partidos );
    body = body.set('puntos', estadistica.puntos );
    body = body.set('anotados', estadistica.anotados );
    body = body.set('recibidos', estadistica.recibidos );
    body = body.set('diferencia', estadistica.diferencia );
    body = body.set('ganados', estadistica.ganados );
    body = body.set('empatados', estadistica.empatados );
    body = body.set('perdidos', estadistica.perdidos );
    body = body.set('pais', estadistica.pais );
    body = body.set('grupo', estadistica.grupo );

    if (estadistica._id) {

      let url = URL_SERVICIOS + '/estadistica/' + estadistica._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Estadistica Actualizado', ' ', 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar estadistica', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/estadistica';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Estadistica Creado', '', 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear estadistica', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
