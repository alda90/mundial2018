import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor(
            public router: Router,
            public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
                  .subscribe( resp => this.router.navigate(['/']));

    console.log(forma.value);
  }

}
