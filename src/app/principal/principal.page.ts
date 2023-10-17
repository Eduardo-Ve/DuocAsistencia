import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToAsistencias() {
    this.navCtrl.navigateForward('/asistencias');
  }
  navigateToConfiguraciones() {
    this.navCtrl.navigateForward('/configuraciones');
  }
  navigateToEscaner() {
    this.navCtrl.navigateForward('/escaner');
  }
  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }
}
