import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }
  backMenu(){
    this.navCtrl.navigateBack('/principal');
  }
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.navCtrl.navigateRoot(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}

