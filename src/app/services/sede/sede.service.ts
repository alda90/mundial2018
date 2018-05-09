import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Sede } from '../../models/sede.model';

@Injectable()
export class SedeService {

  totalSedes: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarSedes() {
    let url = URL_SERVICIOS + '/sede';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalSedes = resp.total;
                return resp.sede;
              });
  }

  obtenerSede (id: string) {
    let url = URL_SERVICIOS + '/sede/' + id;

    return this.http.get(url)
                .map((resp: any) => resp.sede);
  }

  guardarSede(sede: Sede) {

    let body = new HttpParams();
    body = body.set('sede', sede.sede);
    body = body.set('sedeingles', sede.sedeingles);
    body = body.set('sedelocal', sede.sedelocal);

    if (sede._id) {

      let url = URL_SERVICIOS + '/sede/' + sede._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Sede Actualizado', sede.sede, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar sede', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/sede';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Sede Creado', sede.sede, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear sede', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
