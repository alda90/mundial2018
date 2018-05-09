import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    console.log(this._usuarioService.usuario);
  }

}
