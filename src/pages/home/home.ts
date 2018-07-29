import {IonicPage, NavParams, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {UserLoginService} from "../../providers/userLogin.service";
import {MapUserToken} from "../../models/mapUserToken";
import {Object2MapUserToken} from "../../utils/object2MapUserToken";
import {Data} from "../../models/data";
import {Notification} from "../../models/notification";
import {PushBody} from "../../models/pushBody";
import {Storage} from "@ionic/storage";

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public mapsUserToken: MapUserToken[];
  public pushTitle = 'Someone is in danger ';
  public pushBodyMsg = 'can you help?';

  constructor(public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public userService: UserLoginService, public storage: Storage) {
  }

  showAlert() {

    this.userService.getUsers().subscribe(response => {

        this.mapsUserToken = Object2MapUserToken.applyOnArray(response.json());

        this.mapsUserToken.forEach(mapUserToken => {

          this.storage.get('email').then(email => {
            const notification = new Notification(this.pushTitle + email, this.pushBodyMsg);
            const data = new Data(this.pushTitle + email, this.pushBodyMsg);
            const pushBody = new PushBody(mapUserToken.token, notification, data);

            this.userService.sendPushToUser(pushBody).subscribe(response => {
                console.log('Push notification sent to: ' + email);
              },
              error => {
                console.log('Push notification could\'n be sent to: ' + email + '. Error: ' + error);
              });
          });
        })
      },
      error => {
        console.log('Error while getting users');
      });
  }

  goToSettingsPage() {
    this.navCtrl.push('SettingsPage');
  }

  goToMessagesPage() {
    this.navCtrl.push('MessagesPage');
  }


}
