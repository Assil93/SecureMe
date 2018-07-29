import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Events, MenuController, Platform} from "ionic-angular";
import {AwsUtil} from "../../providers/aws.service";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginComponent} from "./login.component";
import {LogoutComponent} from "../auth/logout.component";
import {ControlPanelComponent} from "../controlpanel/controlpanel";
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import {CognitoCallback, LoggedInCallback} from "../../providers/cognito.service";
import {AlertController} from "ionic-angular";
import {UserLoginService} from "../../providers/userLogin.service";
import {EventsService} from "../../providers/events.service";
import {RegisterComponent} from "../auth//register.component";
import {ForgotPasswordStep1Component} from "../auth/forgotPassword1.component";

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


  constructor(public nav: NavController,
              public navParam: NavParams,
              public alertCtrl: AlertController,
              public userService: UserLoginService,
              public eventService: EventsService) {
      console.log("LoginComponent constructor");
      if (navParam != null && navParam.get("email") != null)
          this.email = navParam.get("email");

  }

  ionViewLoaded() {
      console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
      this.userService.isAuthenticated(this);
  }

  signMeIn() {
      console.log("in onLogin");
      if (this.email == null || this.password == null) {
       //   this.doAlert("Error", "All fields are required");
          return;
      }
      this.userService.authenticate(this.email, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
      if (message != null) { //error
          //this.doAlert("Error", message);
          this.error =true;
          console.log("result: " + message);
      } else { //success
        this.error =false;
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
