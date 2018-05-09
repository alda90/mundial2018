import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Arbitro } from '../../models/arbitro.model';

@Injectable()
export class ArbitroService {

  totalArbitros: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarArbitros() {
    let url = URL_SERVICIOS + '/arbitro';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalArbitros = resp.total;
                return resp.arbitro;
              });
  }

  obtenerArbitro (id: string) {
    let url = URL_SERVICIOS + '/arbitro/arbitro';
    let body = new HttpParams();
    body = body.set('idarbitro', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.arbitro);
  }

  guardarArbitro(arbitro: Arbitro) {
    
    
    let body = new HttpParams();
    body = body.set('arbitro', arbitro.arbitro);
    body = body.set('pais', arbitro.pais);
    body = body.set('posicion', arbitro.posicion);

    if (arbitro._id) {

      let url = URL_SERVICIOS + '/arbitro/' + arbitro._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Árbitro Actualizado',arbitro.arbitro, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar arbitro', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/arbitro';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Árbitro Creado', arbitro.arbitro, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear árbitro', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
