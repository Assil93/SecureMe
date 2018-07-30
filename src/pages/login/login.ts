import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Events, MenuController, Platform} from "ionic-angular";
import {AwsUtil} from "../../providers/aws.service";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginComponent} from "./login.component";
import {LogoutComponent} from "../auth/logout.component";
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import {CognitoCallback, LoggedInCallback} from "../../providers/cognito.service";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {UserLoginService} from "../../providers/userLogin.service";
import {EventsService} from "../../providers/events.service";
import {ControlPanelComponent} from "../controlpanel/controlpanel";
import {RegisterComponent} from "../../components/register/register";
import {ForgotPasswordStep1Component} from "../../components/forgot-password-step1/forgot-password-step1";
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {Storage} from '@ionic/storage';

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
  email: string;
  password: string;
  error: boolean;
  errorMessage:string;
  emptyEmail:boolean;
  emptyPasswort:boolean;


  constructor(public nav: NavController,
              public navParam: NavParams,
              public alertCtrl: AlertController,
              public userService: UserLoginService,
              public eventService: EventsService,
              public storage: Storage)
               {
      console.log("LoginComponent constructor");
      if (navParam != null && navParam.get("email") != null)
          this.email = navParam.get("email");

  }

  ionViewLoaded() {
      console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
      this.userService.isAuthenticated(this);
  }

  signMeIn() {
      this.emptyEmail = false;
      this.emptyPasswort = false;
      console.log("in onLogin");
      if(this.email == null|| this.email.trim().length == 0){
          this.emptyEmail=true;
          console.log(this.email)
      }
      if (this.password == null || this.password.trim().length == 0) {
          this.emptyPasswort = true;
          console.log(this.emptyEmail)
       //   this.doAlert("Error", "All fields are required");
          return;
      }
      this.userService.authenticate(this.email, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
      this.errorMessage = "";
      if (message != null) { //error
        //  this.doAlert("Error", message);
          this.error =true;
          console.log(this.error)
          if(message="User does not exist"){
              this.errorMessage = "Die Kombination von Email und Passwort konnte nicht gefunden werden."
          }
          else{
            this.errorMessage = message;
          } 
          console.log("result: " + message);
      } else { //success
        this.error =false;
        this.errorMessage = "";
          console.log("Redirect to HomePage");
          this.nav.push('HomePage');
          //this.nav.setRoot(ControlPanelComponent);
      }
  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {
      console.log("The user is logged in: " + isLoggedIn);
      if (isLoggedIn) {
          this.eventService.sendLoggedInEvent();
          this.nav.setRoot('HomePage');
      }
  }

  navToRegister() {
      this.nav.push(RegisterComponent);
  }

  navToForgotPassword() {
      this.nav.push(ForgotPasswordStep1Component);
  }

  doAlert(title: string, message: string) {

      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }

}
