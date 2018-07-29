import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';


declare var google;
/**
 * Generated class for the SosDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SosDetailsPage'
})
@Component({
  selector: 'page-sos-details',
  templateUrl: 'sos-details.html',
})
export class SosDetailsPage {
 id:String;
 name: String;
 state:String;
 reason:String;
 help = false;
 @ViewChild('map') mapElement: ElementRef;
    map: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.id = navParams.get('id');
    this.name = navParams.get('name');
    this.state = navParams.get('state');
    this.reason = navParams.get('reason');
 }

 helpTrue(){
   this.help = true;
   this.showAlert(this.help)
 }

 helpFalse(){
  this.help = false;
  this.showAlert(this.help)
}

 showAlert(help) {
  const alert = this.alertCtrl.create({
    subTitle: 'Du hilfst '+ this.name + '!',
    buttons: ['OK']
  });
  const alert_false = this.alertCtrl.create({
    subTitle: 'Schade, dass du '+ this.name + 'nicht helfen kannst',
    buttons: ['OK']
  });
  if (help==true){
    alert.present();
  }
  else
  alert_false.present();
  
}

goToMapPage() {
  this.navCtrl.push('MapPage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosDetailsPage');
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
}
