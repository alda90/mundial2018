import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Confederacion } from '../../models/confederacion.model';

@Injectable()
export class ConfederacionesService {

  totalConfederaciones: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarConfederaciones() {
    let url = URL_SERVICIOS + '/confederacion';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalConfederaciones = resp.total;
                return resp.confederacion;
              });
  }

  obtenerConfederacion (id: string) {
    let url = URL_SERVICIOS + '/confederacion/' + id;

    return this.http.get(url)
                .map((resp: any) => resp.confederacion);
  }

  guardarConfederacion(confederacion: Confederacion) {
    
    
    let body = new HttpParams();
    body = body.set('confederacion', confederacion.confederacion);
    body = body.set('acronimo', confederacion.acronimo);
    body = body.set('siglas', confederacion.siglas);
    body = body.set('fundacion', confederacion.fundacion);
    body = body.set('sede', confederacion.sede);
    body = body.set('ambito', confederacion.ambito);
    body = body.set('presidente', confederacion.presidente);

    if (confederacion._id) {

      let url = URL_SERVICIOS + '/confederacion/' + confederacion._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Árbitro Actualizado', confederacion.confederacion, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar confederacion', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/confederacion';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Confederacion Creado', confederacion.confederacion, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear confederacion', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
