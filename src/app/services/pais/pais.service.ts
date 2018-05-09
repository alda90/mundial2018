import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pais } from '../../models/pais.model';

@Injectable()
export class PaisService {

  totalPaises: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarPaises() {
    let url = URL_SERVICIOS + '/pais';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalPaises = resp.total;
                return resp.pais;
              });
  }

  obtenerPais (id: string) {
    let url = URL_SERVICIOS + '/pais/' + id;

    return this.http.get(url)
                .map((resp: any) => resp.pais);
  }

  guardarPais(pais: Pais) {

    let body = new HttpParams();
    body = body.set('pais', pais.pais );
    body = body.set('nombreingles', pais.nombreingles );
    body = body.set('nombreoficial', pais.nombreoficial );
    body = body.set('nombrelocal', pais.nombrelocal );
    body = body.set('federacion', pais.federacion );
    body = body.set('federacioningles', pais.federacioningles );
    body = body.set('federacionlocal', pais.federacionlocal );
    body = body.set('codigo', pais.codigo );
    body = body.set('goleador', pais.goleador );
    body = body.set('numgoles', pais.numgoles );
    body = body.set('clasificacion', pais.clasificacion );
    body = body.set('participaciones', pais.participaciones );
    body = body.set('titulos', pais.titulos );
    body = body.set('continente', pais.continente );
    body = body.set('tecnico', pais.tecnico );
    body = body.set('confederacion', pais.confederacion );

    if (pais._id) {

      let url = URL_SERVICIOS + '/pais/' + pais._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('País Actualizado', pais.pais, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar pais', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/pais';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('País Creado', pais.pais, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear país', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
