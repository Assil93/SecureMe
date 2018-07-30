import { Component } from '@angular/core';
import {UserRegistrationService} from "../../providers/userRegistration.service";
import {CognitoCallback, RegistrationUser} from "../../providers/cognito.service";
import {AlertController, NavController} from "ionic-angular";
import {ConfirmRegistrationComponent} from "../../components/confirm-registration/confirm-registration";
import {ResendCodeComponent} from "../../components/resend-code/resend-code";
import {LoginComponent} from "../../pages/login/login.component";




@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterComponent implements CognitoCallback {
  registrationUser: RegistrationUser;
  vorname:string;
  vornameError:boolean;
  nachname:string;
  email: string;
  emailError:boolean;
  emailInvalid:boolean;
  nachnameError:boolean; 
  password: string;
  passwordNull:boolean;
  passwordTooShort:boolean;
  passwordLength:number;
  errorMessage:string;
  messageTrue:boolean;

  constructor(public nav: NavController,
              public userRegistration: UserRegistrationService,
              public alertCtrl: AlertController) {
      this.registrationUser = new RegistrationUser();
  }

  ionViewLoaded() {

  }

  onRegister() {
      console.log(this.vorname,this.nachname,this.email,this.password)
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
      this.emailError = false;
      this.vornameError =false;
      this.nachnameError = false;
      this.passwordNull =false; 
      this.emailInvalid= false;
      this.passwordTooShort = false;
      this.messageTrue = false;
      if(this.userRegistration.vornameError){
          this.vornameError = true;
      }
      if(this.userRegistration.nachnameError){
          this.nachnameError = true;
      }
      if(this.userRegistration.emailError){
        this.emailError = true;
    }
    if(this.userRegistration.passwordNull){
        this.passwordNull = true;
    }
    if(this.userRegistration.emailInvalid){
            this.emailInvalid =true;
    }
    if(this.userRegistration.passwordTooShort){
        this.passwordTooShort = true;
    }
    
      if (message != null) { //error
        console.log("Registration", message)
        var expr = /exist/;  // no quotes here
        console.log(expr.test(message));
        if (expr.test(message)){
            this.messageTrue = true;
            this.errorMessage="Unter diesem Email ist bereits ein Nutzer regisitriert"
        }
         // this.doAlert();

      } else { //success
        this.vornameError=false;
        this.nachnameError=false; 
        this.emailError =false;
        this.passwordNull =false;
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