import {Component} from "@angular/core";
import {LoggedInCallback} from "../../providers/cognito.service";
import {UserLoginService} from "../../providers/userLogin.service";
import {NavController} from "ionic-angular";
import {LoginComponent} from "../login/login.component";
import {Storage} from '@ionic/storage';

@Component({
  template: ''
})
export class LogoutComponent implements LoggedInCallback {

  constructor(public navCtrl: NavController,
              public userService: UserLoginService,
              public storage: Storage) {
    this.userService.isAuthenticated(this)
  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {

      this.storage.get('email').then(email => {

        this.userService.deleteToken(email).subscribe(response => {
          console.log('Token deleted on server!');
        });
      });
      this.storage.remove('email');
      console.log('Email removed from storage!');
      this.userService.logout();
    }
    this.navCtrl.setRoot(LoginComponent)
  }
}







