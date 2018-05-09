import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Alineacion } from '../../models/alineacion.model';

@Injectable()
export class AlineacionService {

  totalAlineaciones: number = 0;
  idpais: string = '';
  pais: string;
  alineacion: string;
  partido: string;

  constructor(
    public http: HttpClient
  ) { }

  cargarAlineaciones() {
    let url = URL_SERVICIOS + '/alineacion';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalAlineaciones = resp.total;
                return resp.alineacion;
              });
  }

  obtenerAlineacion (id: string) {
    let url = URL_SERVICIOS + '/alineacion/partidopais';
    let body = new HttpParams();
    body = body.set('idpartido', id);
    body = body.set('idpais', this.idpais);

    return this.http.post(url, body)
                .map((resp: any) => resp.alineacion);
  }

  obtenerByPartido (id: string) {
    let url = URL_SERVICIOS + '/alineacion/partido';
    let body = new HttpParams();
    body = body.set('idpartido', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.alineacion);
  }


  guardarAlineacion(alineacion: Alineacion) {
 
    let body = new HttpParams();
    body = body.set('estatus', alineacion.estatus);
    body = body.set('partido', alineacion.partido);
    body = body.set('capitan', alineacion.capitan);
    body = body.set('jugador', alineacion.jugador);
    body = body.set('pais', alineacion.pais);

    if (alineacion._id) {

      let url = URL_SERVICIOS + '/alineacion/' + alineacion._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Alineacion Actualizado', 'Alineación', 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar alineacion', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/alineacion';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Alineacion Creado', 'Alineación', 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear alineacion', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
