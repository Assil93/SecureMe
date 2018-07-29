import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {SecureMe} from "./app.component";
import {CognitoUtil} from "../providers/cognito.service";
import {AwsUtil} from "../providers/aws.service";
import {ControlPanelComponent} from "../pages/controlpanel/controlpanel";
import {EventsService} from "../providers/events.service";
import {LoginComponent} from "../pages/login/login.component";
import {RegisterComponent} from "../components/register/register";
import {ConfirmRegistrationComponent} from "../pages/auth/confirmRegistration.component";
import {ResendCodeComponent} from "../pages/auth/resendCode.component";
import {ForgotPasswordStep1Component} from "../components/forgot-password-step1/forgot-password-step1";
import {ForgotPasswordStep2Component} from "../components/forgot-password-step2/forgot-password-step2";
import {UserLoginService} from "../providers/userLogin.service";
import {UserParametersService} from "../providers/userParameters.service";
import {UserRegistrationService} from "../providers/userRegistration.service";
import {LogoutComponent} from "../pages/auth/logout.component";
import {BrowserModule} from "@angular/platform-browser";
import { LoginPage } from '../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import {HomePage} from "../pages/home/home";
import {SettingsPage} from "../pages/settings/settings";
import {MessagesPage} from "../pages/messages/messages";
import {Push} from "@ionic-native/push";
import {Http, HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';

//import { Push, PushObject, PushOptions } from '@ionic-native/push';


@NgModule({
    declarations: [
        SecureMe,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ConfirmRegistrationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPasswordStep2Component,
        ControlPanelComponent

    ],
    imports: [
        IonicModule.forRoot(SecureMe),
        IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        SecureMe,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ConfirmRegistrationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPasswordStep2Component,
        ControlPanelComponent   ],
    providers: [CognitoUtil,
        AwsUtil,
        UserLoginService,
        UserParametersService,
        UserRegistrationService,
        EventsService,
        Geolocation,
        Push]    
})

export class AppModule {
}
