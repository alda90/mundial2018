import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador terminó!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }

   regresaObservable(): Observable <any> {
     return  new Observable(observer => {
       let contador = 0;

       let intervalo = setInterval(() => {

         contador += 1;

         let salida = {
           valor: contador
         };

         observer.next(salida);
         // if(contador === 3) {
         //   clearInterval(intervalo);
         //   observer.complete();
         // }

        // if(contador === 2) {
         //   clearInterval(intervalo);
         //   observer.error('Auxilio!');
         // }

       }, 1000);
     });


   }

}
