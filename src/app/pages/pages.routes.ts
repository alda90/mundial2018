import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ArbitrosComponent } from './admin/arbitros/arbitros.component';
import { AdminGuard, LoginGuard } from '../services/service.index';
import { ConfederacionesComponent } from './admin/confederaciones/confederaciones.component';
import { GruposComponent } from './admin/grupos/grupos.component';
import { SedesComponent } from './admin/sedes/sedes.component';
import { TecnicosComponent } from './admin/tecnicos/tecnicos.component';
import { EstadiosComponent } from './admin/estadios/estadios.component';
import { PaisesComponent } from './admin/paises/paises.component';
import { JugadoresComponent } from './admin/jugadores/jugadores.component';
import { PartidosComponent } from './admin/partidos/partidos.component';
import { AlineacionesComponent } from './admin/alineaciones/alineaciones.component';
import { IncidenciasComponent } from './admin/incidencias/incidencias.component';
import { EstadisticasComponent } from './admin/estadisticas/estadisticas.component';
import { ArbitrospartComponent } from './admin/arbitrospart/arbitrospart.component';


const pagesRoutes: Routes = [
    {
        path: 'admin',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'arbitros', component: ArbitrosComponent, data: { titulo: 'Árbitros' } },
            { path: 'confederaciones', component: ConfederacionesComponent, data: { titulo: 'Confederaciones' } },
            { path: 'grupos', component: GruposComponent, data: { titulo: 'Grupos' } },
            { path: 'sedes', component: SedesComponent, data: { titulo: 'Sedes' } },
            { path: 'tecnicos', component: TecnicosComponent, data: { titulo: 'Técnicos' } },
            { path: 'estadios', component: EstadiosComponent, data: { titulo: 'Estadios' } },
            { path: 'paises', component: PaisesComponent, data: { titulo: 'Paises' } },
            { path: 'jugadores/:id', component: JugadoresComponent, data: { titulo: 'Jugadores' } },
            { path: 'partidos', component: PartidosComponent, data: { titulo: 'Partidos' } },
            { path: 'alineaciones/:id', component: AlineacionesComponent, data: { titulo: 'Alineaciones' } },
            { path: 'incidencias/:id', component: IncidenciasComponent, data: { titulo: 'Incidencias' } },
            { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' } },
            { path: 'arbitrospart/:id', component: ArbitrospartComponent, data: { titulo: 'Arbitros de Partido' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: '', redirectTo: '/', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
