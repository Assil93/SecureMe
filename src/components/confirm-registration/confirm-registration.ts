import { Component } from '@angular/core';
import {UserRegistrationService} from "../../providers/userRegistration.service";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {LoginComponent} from "../../pages/login/login.component";
import {ResendCodeComponent} from "../../components/resend-code/resend-code";
import {RegisterComponent} from "../../components/register/register";


@Component({
  selector: 'confirm-registration',
  templateUrl: 'confirm-registration.html'
})
export class ConfirmRegistrationComponent {

  text: string;

  constructor() {
    console.log('Hello ConfirmRegistrationComponent Component');
    this.text = 'Hello World';
  }

}
