import { Component, OnInit } from '@angular/core';

declare function init_plugins();
declare function init_plugins2();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
    init_plugins2();
  }

}
