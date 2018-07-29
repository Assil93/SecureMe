import {Component} from "@angular/core";
import {CognitoCallback, LoggedInCallback} from "../../providers/cognito.service";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {UserLoginService} from "../../providers/userLogin.service";
import {EventsService} from "../../providers/events.service";
import {ControlPanelComponent} from "../controlpanel/controlpanel";
import {RegisterComponent} from "../auth/register.component";
import {ForgotPasswordStep1Component} from "../auth/forgotPassword1.component";
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {Storage} from '@ionic/storage';
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'login.html'
})
export class LoginComponent implements CognitoCallback, LoggedInCallback {
    email: string;
    password: string;
    error:boolean;

  constructor(public nav: NavController,
              public navParam: NavParams,
              public alertCtrl: AlertController,
              public userService: UserLoginService,
              public eventService: EventsService,
              public storage: Storage) {
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
            //this.doAlert("Error", "All fields are required");
            return;
        }
        this.storage.set('email', this.email);

        this.userService.authenticate(this.email, this.password, this);
        //this.userService.authenticate(this.email, this.password, this);
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
