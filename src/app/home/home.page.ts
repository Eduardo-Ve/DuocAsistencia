import { Component } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('errorAnimation', [
      state('error', style({
        color: 'red',
        fontWeight: 'bold',
      })),
      transition('* => error', animate('0.2s')),
    ]),
  ],
})
export class HomePage {
  usuario = ""
  clave = ""
  usuarioError = false;
  claveError = false;


  constructor(private nav: NavController,
    private anim: AnimationController
    ) {} login() {
      this.usuarioError = this.usuario.length <= 3;
      this.claveError = this.clave.length <= 3;
    
      if (!this.usuarioError && !this.claveError) {
        // Realizar la lógica de inicio de sesión exitoso
        if (this.usuario === 'admin' && this.clave === '1234') {
          console.log('funciona');
          this.nav.navigateForward('principal');
        } else {
          console.log('no funciona');
          this.playErrorAnimation('.input-box')
          this.playErrorAnimation('.password-box')
        }
      } else {
        // Aplicar animación de error solo al campo que tiene error
        if (this.usuarioError) {
          this.playErrorAnimation('.input-box');
        }
        if (this.claveError) {
          this.playErrorAnimation('.password-box');
        }
      }
    }
    
    
  
    navigateToAsistencias() {
      this.nav.navigateForward('/asistencias');
    }
  
    private playErrorAnimation(elementClass: string) {
      const element = document.querySelector(elementClass);
  
      if (element) {
        this.anim.create()
          .addElement(element)
          .duration(300)
          .iterations(1)
          .fromTo('transform', 'translateX(0px)', 'translateX(10px)')
          .fromTo('transform', 'translateX(10px)', 'translateX(0px)')
          .play();
      }
    }
}



