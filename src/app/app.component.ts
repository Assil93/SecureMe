import {Component, ViewChild} from "@angular/core";
import {Events, MenuController, NavController, Platform, AlertController} from "ionic-angular";
import {AwsUtil} from "../providers/aws.service";
import {ControlPanelComponent} from "../pages/controlpanel/controlpanel";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginComponent} from "../pages/auth/login.component";
import {LogoutComponent} from "../pages/auth/logout.component";
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(NavController) navCtrl;
    public loginPage = LoginComponent;
    public homePage = ControlPanelComponent;
    public logoutPage = LogoutComponent;
    public settingsPage = ControlPanelComponent;
    public splash = new SplashScreen();
    public rootPage: any;


    constructor(public platform: Platform,
                public menu: MenuController,
                public events: Events,
                public awsUtil: AwsUtil){
               // statusBar: StatusBar, 
                //splashScreen: SplashScreen,
             //   public push: Push,
                //public alertCtrl: AlertController) {
        console.log("In MyApp constructor");

        this.platform.ready().then(() => {
            this.awsUtil.initAwsService();

            this.rootPage = this.loginPage;

            console.log("Hiding splash screen");
            //statusBar.styleDefault();
            this.splash.hide();
            this.listenToLoginEvents();
           // this.initPushNotification();
        });

    }

    
    openPage(page) {
        // Reset the nav controller to have just this page
        // we wouldn't want the back button to show in this scenario
        this.rootPage = page;

        // close the menu when clicking a link from the menu
        this.menu.close();
    }

    listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.enableMenu(true);
        });


        this.events.subscribe('user:logout', () => {
            this.enableMenu(false);
        });
    }

    enableMenu(loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    }
    
 

}
