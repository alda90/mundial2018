import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
//import swal from 'sweetalert';
import * as sweetalert from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Tecnico } from '../../models/tecnico.model';

@Injectable()
export class TecnicoService {

  totalTecnicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarTecnicos() {
    let url = URL_SERVICIOS + '/tecnico';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalTecnicos = resp.total;
                return resp.tecnico;
              });
  }

  obtenerTecnico (id: string) {
    let url = URL_SERVICIOS + '/sede/tecnico';
    let body = new HttpParams();
    body = body.set('idtecnico', id);

    return this.http.post(url, body)
                .map((resp: any) => resp.tecnico);
  }

  guardarTecnico(tecnico: Tecnico) {
    
    
    let body = new HttpParams();
    body = body.set('nombre', tecnico.nombre);
    body = body.set('pais', tecnico.pais);
    body = body.set('nacimiento', tecnico.nacimiento);
    body = body.set('fechanac', tecnico.fechanac);
    body = body.set('nombrecompleto', tecnico.nombrecompleto);
    body = body.set('nombrelocal', tecnico.nombrelocal);

    if (tecnico._id) {

      let url = URL_SERVICIOS + '/tecnico/' + tecnico._id;

      return this.http.put(url, body)
                .map((resp: any) => {
                  swal('Tecnico Actualizado', tecnico.nombre, 'success');
                  return resp;
                })
                .catch(err => {
                  swal('Error al actualizar tecnico', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });

    } else {
      let url = URL_SERVICIOS + '/tecnico';

      return this.http.post(url, body)
                .map((resp: any) => {
                  console.log(resp);
                  swal('Tecnico Creado', tecnico.nombre, 'success');
                  return resp;
                })
                .catch(err => {

                  swal('Error al crear tecnico', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
    }

 }

}
