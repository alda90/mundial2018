import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/// Routes
import { PAGES_ROUTES } from './pages.routes';

/// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

//// Components
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ArbitrosComponent } from './admin/arbitros/arbitros.component';
import { HomeComponent } from './home.component';
import { MenuadminComponent } from '../shared/menuadmin/menuadmin.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalArbitroComponent } from '../components/modal-arbitro/modal-arbitro.component';
import { ConfederacionesComponent } from './admin/confederaciones/confederaciones.component';
import { ModalConfederacionComponent } from '../components/modal-confederacion/modal-confederacion.component';
import { GruposComponent } from './admin/grupos/grupos.component';
import { ModalGrupoComponent } from '../components/modal-grupo/modal-grupo.component';
import { SedesComponent } from './admin/sedes/sedes.component';
import { ModalSedeComponent } from '../components/modal-sede/modal-sede.component';
import { TecnicosComponent } from './admin/tecnicos/tecnicos.component';
import { ModalTecnicoComponent } from '../components/modal-tecnico/modal-tecnico.component';
import { EstadiosComponent } from './admin/estadios/estadios.component';
import { ModalEstadioComponent } from '../components/modal-estadio/modal-estadio.component';
import { PaisesComponent } from './admin/paises/paises.component';
import { ModalPaisComponent } from '../components/modal-pais/modal-pais.component';
import { JugadoresComponent } from './admin/jugadores/jugadores.component';
import { ModalJugadorComponent } from '../components/modal-jugador/modal-jugador.component';
import { PartidosComponent } from './admin/partidos/partidos.component';
import { ModalPartidoComponent } from '../components/modal-partido/modal-partido.component';
import { AlineacionesComponent } from './admin/alineaciones/alineaciones.component';
import { ModalAlineacionComponent } from '../components/modal-alineacion/modal-alineacion.component';
import { IncidenciasComponent } from './admin/incidencias/incidencias.component';
import { ModalIncidenciaComponent } from '../components/modal-incidencia/modal-incidencia.component';
import { EstadisticasComponent } from './admin/estadisticas/estadisticas.component';
import { ModalEstadisticaComponent } from '../components/modal-estadistica/modal-estadistica.component';
import { ArbitrospartComponent } from './admin/arbitrospart/arbitrospart.component';
import { ModalArbitrospartComponent } from '../components/modal-arbitrospart/modal-arbitrospart.component';



@NgModule({
    declarations: [
        PagesComponent,
        HeaderComponent,
        MenuadminComponent,
        ArbitrosComponent,
        HomeComponent,
        RxjsComponent,
        ModalUploadComponent,
        ModalArbitroComponent,
        ConfederacionesComponent,
        ModalConfederacionComponent,
        GruposComponent,
        ModalGrupoComponent,
        SedesComponent,
        ModalSedeComponent,
        TecnicosComponent,
        ModalTecnicoComponent,
        EstadiosComponent,
        ModalEstadioComponent,
        PaisesComponent,
        ModalPaisComponent,
        JugadoresComponent,
        ModalJugadorComponent,
        PartidosComponent,
        ModalPartidoComponent,
        AlineacionesComponent,
        ModalAlineacionComponent,
        IncidenciasComponent,
        ModalIncidenciaComponent,
        EstadisticasComponent,
        ModalEstadisticaComponent,
        ArbitrospartComponent,
        ModalArbitrospartComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule
    ]
})

export class PagesModule { }