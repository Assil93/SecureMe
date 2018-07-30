import { Component } from '@angular/core';
import {CognitoCallback} from "../../providers/cognito.service";
import {AlertController, NavController} from "ionic-angular";
import {ForgotPasswordStep2Component} from "../forgot-password-step2/forgot-password-step2";
import {UserLoginService} from "../../providers/userLogin.service";
import {RegisterComponent} from  "../register/register"
import {LoginComponent} from  "../../pages/login/login.component";
/**
 * Generated class for the ForgotPasswordStep1Component component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'forgot-password-step1',
  templateUrl: 'forgot-password-step1.html'
})
export class ForgotPasswordStep1Component implements CognitoCallback {
  email: string;
  emailerror: boolean;
  isenabled:boolean=false;

  constructor(public nav: NavController, public alertCtrl: AlertController, public userService: UserLoginService) {
  }

  onNext() {
      this.userService.forgotPassword(this.email, this);
  }

  cognitoCallback(message: string, result: any) {
      if (message == null && result == null) { //error
          this.nav.push(ForgotPasswordStep2Component, {'email': this.email})
          this.emailerror = false;          
      }
      else {
        this.emailerror =true;
          console.log(this.emailerror)
     // this.doAlert("2","d")}
      }
  }

  navToRegister() {
      this.nav.push(RegisterComponent);
  }

  navToLogin() {
      this.nav.push(LoginComponent);
  }

  doAlert(title: string, message: string) {
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }
  disableButton(){
      if (this.email==null|| this.email.trim().length == 0 ){
          return true
      }

  }
}