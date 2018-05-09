import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  admin: Boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this._usuarioService.usuario.tipo === 'ADMINISTRADOR') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  logOut(){
    this._usuarioService.logout();
  }

  navigate(ruta: string) {

    if (ruta === 'admin') {
      this.router.navigate(['/admin/partidos']);
    } else if (ruta === 'home') {
      this.router.navigate(['/']);
    }

  }

}
