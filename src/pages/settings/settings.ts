import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SettingsPage'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  settings_list = {
    "settings":[
      { "name": "Profile"}, 
      { "name": "Benachrichtigungen"},
      {"name": "Ton"},
      { "name": "Ausloggen"}
  ]
 }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
