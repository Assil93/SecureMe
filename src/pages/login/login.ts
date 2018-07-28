import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  
  constructor(public navParams: NavParams, public navCtrl: NavController) {
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }


  goToHomePage() {
    this.navCtrl.push('HomePage');
 }







}
