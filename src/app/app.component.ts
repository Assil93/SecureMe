import {Component, ViewChild} from "@angular/core";
import {Events, MenuController, NavController, Platform, AlertController} from "ionic-angular";
import {AwsUtil} from "../providers/aws.service";
import {ControlPanelComponent} from "../pages/controlpanel/controlpanel";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginComponent} from "../pages/login/login.component";
import {LogoutComponent} from "../pages/auth/logout.component";
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import {HomePage} from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { App  } from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class SecureMe {
    @ViewChild(NavController) navCtrl;

    @ViewChild('myNav') nav: NavController
    rootPage: string = 'LoginPage';
    constructor(public app: App 
    ){
      //  this.app.getRootNav().setRoot( LoginPage );
    }
    setRoot(root){
        this.rootPage = root;
    }
   



   


}
