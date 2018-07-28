import {Component} from "@angular/core";
import {CognitoCallback, LoggedInCallback} from "../../providers/cognito.service";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {UserLoginService} from "../../providers/userLogin.service";
import {EventsService} from "../../providers/events.service";
import {ControlPanelComponent} from "../controlpanel/controlpanel";
import {RegisterComponent} from "./register.component";
import {ForgotPasswordStep1Component} from "./forgotPassword1.component";
import {Push, PushToken} from "@ionic/cloud-angular";
import {Http} from "@angular/http";
@Component({
    templateUrl: 'login.html'
})
export class LoginComponent implements CognitoCallback, LoggedInCallback {
    email: string;
    password: string;

    public saveTokenURL = 'http://18.188.33.56:8080/maps';

    constructor(public nav: NavController,
                public navParam: NavParams,
                public alertCtrl: AlertController,
                public userService: UserLoginService,
                public eventService: EventsService,
                public push: Push,
                public http: Http) {
        console.log("LoginComponent constructor");
        if (navParam != null && navParam.get("email") != null)
            this.email = navParam.get("email");

        console.log('Mon controller');

        this.push.unregister();

        this.push.register().then((t: PushToken) => {
            console.log('Test token saved');
            return this.push.saveToken(t);
        }).then((t: PushToken) => {
            console.log('Test token save');
            let body = {username: 'usertest', token: t.token };
            let headers = new Headers({ 'Content-Type': 'application/json' });

            this.http.post(this.saveTokenURL, body, headers).toPromise().then(response => {
                return response.json();
            }).then(
                response => {
                    console.log(response);
                }
            );
        });

    }

    ionViewLoaded() {
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        this.userService.isAuthenticated(this);
    }

    signMeIn() {
        console.log("in onLogin");
        if (this.email == null || this.password == null) {
            this.doAlert("Error", "All fields are required");
            return;
        }
        this.userService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.doAlert("Error", message);
            console.log("result: " + message);
        } else { //success
            console.log("Redirect to ControlPanelComponent");
            this.nav.setRoot(ControlPanelComponent);
        }
    }

    isLoggedInCallback(message: string, isLoggedIn: boolean) {
        console.log("The user is logged in: " + isLoggedIn);
        if (isLoggedIn) {
            this.eventService.sendLoggedInEvent();
            this.nav.setRoot(ControlPanelComponent);
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