import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {CognitoUtil} from "../providers/cognito.service";
import {AwsUtil} from "../providers/aws.service";
import {ControlPanelComponent} from "../pages/controlpanel/controlpanel";
import {EventsService} from "../providers/events.service";
import {LoginComponent} from "../pages/auth/login.component";
import {RegisterComponent} from "../pages/auth/register.component";
import {ConfirmRegistrationComponent} from "../pages/auth/confirmRegistration.component";
import {ResendCodeComponent} from "../pages/auth/resendCode.component";
import {ForgotPasswordStep1Component} from "../pages/auth/forgotPassword1.component";
import {ForgotPasswordStep2Component} from "../pages/auth/forgotPassword2.component";
import {UserLoginService} from "../providers/userLogin.service";
import {UserParametersService} from "../providers/userParameters.service";
import {UserRegistrationService} from "../providers/userRegistration.service";
import {LogoutComponent} from "../pages/auth/logout.component";
import {BrowserModule} from "@angular/platform-browser";
import {Geolocation} from '@ionic-native/geolocation';
import {HomePage} from "../pages/home/home";
import {SettingsPage} from "../pages/settings/settings";
import {MessagesPage} from "../pages/messages/messages";
import {Push} from "@ionic-native/push";
import {Http, HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';

//import { Push, PushObject, PushOptions } from '@ionic-native/push';


@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    ControlPanelComponent,
    HomePage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    ControlPanelComponent,
    HomePage
  ],
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
