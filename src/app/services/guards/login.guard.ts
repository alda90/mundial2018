import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public _usuarioServices: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    if (this._usuarioServices.estaLogueado()) {
      console.log('Paso EL GUARD');
      return true;
    } else {
      console.log('bloqueado por el GUard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
