import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styles: []
})
export class MenuadminComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  navigate(ruta: string) {

    if (ruta === 'home') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/admin/' + ruta]);
    }

  }

  logOut(){
    this._usuarioService.logout();
  }

}
