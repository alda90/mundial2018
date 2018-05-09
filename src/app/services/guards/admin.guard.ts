import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuaroService: UsuarioService,
    public router: Router
  ){}


  canActivate() {
  
    if (this._usuaroService.usuario.tipo === 'ADMINISTRADOR') {
      return true;
    } else {
      console.log('Bloqueado por el Admin Guard');
      this._usuaroService.logout();
      return true;
    }
  }
}
