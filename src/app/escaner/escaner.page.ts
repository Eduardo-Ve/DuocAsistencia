import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

export interface Asistencia {
  fecha: String;
  asignatura: String;
}

 
@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})

export class EscanerPage implements OnInit, AfterViewInit, OnDestroy {
  textoQR = "";
  result = "";
  scanActive = false;
  name ="";

  toAdd: Asistencia = {
    asignatura: '',
    fecha: ""    
  }

  asistencias: Asistencia[] = [];

  constructor(private storage:Storage, private navCtrl: NavController, private alertController: AlertController) {}
  async guardarAsistencia(){
    let asistencia = await this.storage.get("asistencia") || []   
    this.toAdd.asignatura = this.result;
    this.toAdd.fecha = new Date().toISOString();
    asistencia.push(this.toAdd)
    await this.storage.set("asistencia", asistencia)
  }

  async startScanner(){
    const allowed = await this.checkPermission();
    if(allowed){
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();

      if(result.hasContent){
        this.result = result.content;
        this.scanActive = false;
        this.guardarAsistencia()
      }
    }
  }

  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }

  async generarQR() {
    // Aquí debes usar una biblioteca de generación de códigos QR para crear el QR y mostrarlo en la interfaz de usuario.
    // Puedes usar ngx-qrcode2 u otra biblioteca similar.
  }

  ngOnInit() {
    this.obtenerAsistencias();
  }
  async obtenerAsistencias() {
    this.asistencias = await this.storage.get("asistencia") || [];
  }
  backMenu() {
    this.navCtrl.navigateBack('/principal');
  }
 

  checkPermission = async () => {
  // check or request permission
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.granted) {
    // the user granted permission
    return true;
  }

  return false;
};
  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  
}