import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage({
    name: 'HomePage'
  })
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController) {
    }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'SOS abgeschickt!',
      subTitle: 'Deinen SOS-Ruf ist abgeschickt',
      buttons: ['OK']
    });
    alert.present();
  }

    goToSettingsPage() {
      this.navCtrl.push('SettingsPage');
   }

   goToMessagesPage() {
    this.navCtrl.push('MessagesPage');
 }

   

}