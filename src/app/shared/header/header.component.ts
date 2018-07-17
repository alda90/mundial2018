import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  admin: Boolean = false;
  logueado: Boolean = false;
  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.logueado = this._usuarioService.estaLogueado();
    console.log('log1', this.logueado);
    this.usuario = this._usuarioService.usuario;
    if(this.usuario === null) {
      this.logueado = false;
      this.admin = false;
    } else {
      if (this.usuario.tipo === 'ADMINISTRADOR') {

        this.admin = true;
      } else {
        this.admin = false;
      }
    }
    
  }



  logOut() {
    this._usuarioService.logout();
  }

  navigate(ruta: string) {

    if (ruta === 'admin') {
      this.router.navigate(['/admin/partidos']);
    } else if (ruta === 'home') {
      this.router.navigate(['/']);
    } else if (ruta === 'login') {
      this.router.navigate(['/login']);
    }

  }

}
