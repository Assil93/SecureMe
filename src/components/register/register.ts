import { Component } from '@angular/core';
import {UserRegistrationService} from "../../providers/userRegistration.service";
import {CognitoCallback, RegistrationUser} from "../../providers/cognito.service";
import {AlertController, NavController} from "ionic-angular";
import {ConfirmRegistrationComponent} from "../../pages/auth/confirmRegistration.component";
import {ResendCodeComponent} from "../../pages/auth/resendCode.component";
import {LoginComponent} from "../../pages/login/login.component";

/**
 * Generated class for the RegisterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterComponent implements CognitoCallback {
  registrationUser: RegistrationUser;

  constructor(public nav: NavController,
              public userRegistration: UserRegistrationService,
              public alertCtrl: AlertController) {
      this.registrationUser = new RegistrationUser();
  }

  ionViewLoaded() {

  }

  onRegister() {
      this.userRegistration.register(this.registrationUser, this);
  }

  /**
   * CAllback on the user clicking 'register'
   *
   * The user is taken to a confirmation page where he can enter the confirmation code to finish
   * registration
   *
   */
  cognitoCallback(message: string, result: any) {
      if (message != null) { //error
          this.doAlert("Registration", message);
      } else { //success
          console.log("in callback...result: " + result);
          this.nav.push(ConfirmRegistrationComponent, {
              'username': result.user.username,
              'email': this.registrationUser.email
          });
      }
  }

  navToResendCode() {
      this.nav.push(ResendCodeComponent);
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

}