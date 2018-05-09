import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Arbitrospart } from '../../models/arbitrospart.model';

@Injectable()
export class ArbitrospartService {

  totalArbitrospart: number = 0;
  partido: string;

  constructor(
    public http: HttpClient
  ) { }

  cargarArbitrosPart(id: string) {
    let url = URL_SERVICIOS + '/arbitrospart/partido';
    let body = new HttpParams();
    body = body.set('partido', id);

    return this.http.post(url, body)
              .map((resp: any) => {
                this.totalArbitrospart = resp.total;
                console.log(resp.arbitrospart);
                return resp.arbitrospart;
              });
  }



  guardarArbitrospart(arbitrospart: Arbitrospart) {
 
    let body = new HttpParams();
    body = body.set('arbitro', arbitrospart.arbitro);
    body = body.set('partido', arbitrospart.partido);
    body = body.set('posicion', arbitrospart.posicion);

    if (arbitrospart._id) {

      let url = URL_SERVICIOS + '/arbitrospart/' + arbitrospart._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Arbitrospart Actualizado', 'Arbitros del Partido', 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar arbitrospart', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/arbitrospart';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Arbitrospart Creado', 'Arbitros del Partido', 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear arbitrospart', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
