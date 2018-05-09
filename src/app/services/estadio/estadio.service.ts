import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Estadio } from '../../models/estadio.model';

@Injectable()
export class EstadioService {

  totalEstadios: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarEstadios() {
    let url = URL_SERVICIOS + '/estadio';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalEstadios = resp.total;
                return resp.estadio;
              });
  }

  obtenerEstadio (id: string) {
    let url = URL_SERVICIOS + '/estadio/estadio';
    let body = new HttpParams();
    body = body.set('idestadio', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.estadio);
  }

 

  guardarEstadio(estadio: Estadio) {
    
    
    let body = new HttpParams();
    body = body.set('estadio', estadio.estadio);
    body = body.set('completo', estadio.completo);
    body = body.set('estadiolocal', estadio.estadiolocal);
    body = body.set('capacidad', estadio.capacidad);
    body = body.set('sede', estadio.sede);

    if (estadio._id) {

      let url = URL_SERVICIOS + '/estadio/' + estadio._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Estadio Actualizado', estadio.estadio, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar estadio', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/estadio';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Estadio Creado', estadio.estadio, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear estadio', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
