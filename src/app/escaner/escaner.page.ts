import {  AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, ViewChild, ElementRef } from '@angular/core';
import QRCode  from 'easyqrcodejs';
import { Plugins } from '@capacitor/core';
import { BarcodeScanner, BarcodeScannerPlugin } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('qrcode', { static: false }) private qrcode: ElementRef;
  qr: QRCode
  textoQR = ""
  result="";
  scanActive = false;

  constructor(private navCtrl:NavController, private alertController: AlertController) { }
  ngAfterViewInit(){
    BarcodeScanner.prepare();
  }
  ngOnDestroy(){
    BarcodeScanner.stopScan();
  }
  
  async generarQR() {
    await new Promise(resolve => setTimeout(resolve, 200));
    let options = {
      text: this.textoQR,
      logo: "/assets/duoooc.png",
      logoBackgroundTransparent: true,
      title: "DuocUc Asistencias",
      titleFont: "bold 26px Arial",
      titleColor: "black",
      titleBackgroundColor: "#ffffff",
      titleHeight: 50,
      titleTop: 35,
      width: 256,
      height: 256,
      colorDark: "black", // Cambia el color del código QR a negro
      colorLight: "#ffffff",
      quietZone: 20,
      quietZoneColor: 'transparent',
      dotScale: .7,
      tooltip: false,
      crossOrigin: null,
      logoWidth: 200
    };
    
    

    if (this.qr) {
      this.qr.clear()
    }
    this.qr = new QRCode(this.qrcode.nativeElement, options);
  }

  ngOnInit() {
  }
  backMenu(){
    this.navCtrl.navigateBack('/principal');
  }
   takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
  };
  async startScanner(){
    const allowed = await this.checkPermission();
    if(allowed){
      this.scanActive=true;
      const result = await BarcodeScanner.startScan();
      console.log("🚀 ~ file: escaner.page.ts ~ line 74 ~ escaner ~ startScanner ~ result", result);
      if(result.hasContent){
        this.result=result.content;
        this.scanActive = false;
        console.log(result)
      }
    }
  }
  async checkPermission(  ){
    return new Promise(async(resolve, reject)=>{
    const status = await BarcodeScanner.checkPermission({ force:true });
    if(status.granted){
      resolve(true);
    }else if(status.denied){
      const alert = await this.alertController.create({
        header: "sin permisos",
        message: "Por favor permite el acceso a la camara desde ajustes",
        buttons: [{
          text: 'no',
          role: 'cancelar'
        },
        {
      text: 'abrir ajustes',
          handler: ()=>{
            BarcodeScanner.openAppSettings();
            resolve(false);

          }
        }
      ]
      })
    }else{
      resolve(false);
    }
    });
  }
  stopScanner(){
    BarcodeScanner.startScan();
    this.scanActive = false;
  }

}