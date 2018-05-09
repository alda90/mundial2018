import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  UsuarioService,
  LoginGuard,
  AdminGuard,
  SubirArchivoService,
  AlineacionService,
  ArbitroService,
  ConfederacionesService,
   EstadioService, EstadisticaService, GrupoService, IncidenciaService, JugadorService, PaisService, PartidoService,
    SedeService, TecnicoService, ArbitrospartService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    LoginGuard,
    SubirArchivoService,
    ModalUploadService,
    AdminGuard,
    AlineacionService,
    ArbitroService,
    ConfederacionesService,
    EstadioService,
    EstadisticaService,
    GrupoService,
    IncidenciaService,
    JugadorService,
    PaisService,
    PartidoService,
    SedeService,
    TecnicoService,
    ArbitrospartService
  ],
  declarations: []
})
export class ServiceModule { }
