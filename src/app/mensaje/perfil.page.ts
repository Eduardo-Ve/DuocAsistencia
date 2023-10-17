import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage  {

  constructor(private navCtrl:NavController) { }
  
  mensajes: any[] = [
    {
      asignatura: 'Programacion Movil',
      contenido: 'Recordatorio: Salir de diamante.',
      imagen: 'ruta-de-la-imagen1.jpg',
    },
    {
      asignatura: 'Estadistica descriptiva',
      contenido: 'Se ha publicado la guía para el próximo examen.',
      imagen: 'ruta-de-la-imagen2.jpg',
    },
    {
      asignatura: 'Ética',
      contenido: 'Se ha publicado material extra.',
      imagen: 'ruta-de-la-imagen2.jpg',
    },
    {
      asignatura: 'Arquitectura',
      contenido: 'Nota evaluacion: 70/70.',
      imagen: 'ruta-de-la-imagen2.jpg',
    },
    {
      asignatura: 'Ingles',
      contenido: 'Se ha publicado la guía para el próximo examen.',
      imagen: 'ruta-de-la-imagen2.jpg',
    },
    // Agrega más mensajes aquí
    
  ];
  enviarCorreo() {
    window.location.href = 'mailto:correo@example.com';
  }
  backMenu(){
    this.navCtrl.navigateBack('/principal');
  }
}
