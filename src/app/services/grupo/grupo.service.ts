import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Grupo } from '../../models/grupo.model';

@Injectable()
export class GrupoService {

  totalGrupos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarGrupos() {
    let url = URL_SERVICIOS + '/grupo';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalGrupos = resp.total;
                return resp.grupo;
              });
  }

  obtenerGrupo (id: string) {
    let url = URL_SERVICIOS + '/grupo/grupo';
    let body = new HttpParams();
    body = body.set('idgrupo', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.grupo);
  }

  guardarArbitro(grupo: Grupo) {
    
    
    let body = new HttpParams();
    body = body.set('grupo', grupo.grupo);

    if (grupo._id) {

      let url = URL_SERVICIOS + '/grupo/' + grupo._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Grupo Actualizado',grupo.grupo, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar grupo', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/grupo';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Grupo Creado', grupo.grupo, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear grupo', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
