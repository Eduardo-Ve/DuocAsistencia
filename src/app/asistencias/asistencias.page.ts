import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage {
  ramos: { nombre: string }[] = [
    { nombre: "Arquitectura"},
    { nombre: "Calidad de software"},
    { nombre: "Desarrollo aplicaciones"},
    { nombre: "Ingles intermedio"},
    { nombre: "Etica para el trabajo "},
    { nombre: "Estadistica descriptiva"},
  ];

  expandedRamo: { [nombre: string]: boolean } = {};

  constructor(private navCtrl: NavController) {}

  toggleDetails(ramo: string) {
    this.expandedRamo[ramo] = !this.expandedRamo[ramo];
  }

  isExpanded(ramo: string) {
    return this.expandedRamo[ramo];
  }

  ngOnInit() {
  }
  backMenu(){
    this.navCtrl.navigateBack('/principal');
  }

  showCourseAttendance: { [course: string]: boolean } = {};

  toggleCourse(course: string) {
    this.showCourseAttendance[course] = !this.showCourseAttendance[course];
  }

  isCourseExpanded(course: string) {
    return this.showCourseAttendance[course];
  }
}
