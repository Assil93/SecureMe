import {CognitoCallback, CognitoUtil, RegistrationUser} from "./cognito.service";
import {Injectable} from "@angular/core";

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class UserRegistrationService {
    vornameError:boolean;
    nachname:string;
    email: string;
    emailError:boolean;
    emailInvalid:boolean
    nachnameError:boolean; 
    password: string;
    passwordNull:boolean;
    passwordTooShort: boolean;
    passwordLength: number;


    constructor(public cUtil: CognitoUtil) {
    }
    vornameIsNull(user){
        if(user.vorname == null ||user.vorname == undefined || user.vorname.trim().length == 0){
            console.log(user.vorname)
            return true;
        }
        else return false;
        }
  emailIsNull(user){
    if(user.email == null ||user.email == undefined || user.email.trim().length == 0){
        return true;
    }
    else return false;
      }
    emailInvalidCheck(user){
            let pattern = /\S+@\S+\.\S+/ //x@y.z 
            //let pattern  = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            console.log("email test" + !pattern.test(user.email))
            return !pattern.test(user.email);
    }
    passwordLengthCheck(user){
     if(user.password.length < 8){
         this.passwordLength = user.passwordLength;
         return true;
     }
     else return false;
}
  nachnameIsNull(user){
        if(user.nachname == null ||user.nachname == undefined || user.nachname.trim().length == 0){
            return true;
        }
        else return false;
          }
    passwortIsNull(user){
        if(user.password == null ||user.password == undefined || user.password.trim().length == 0){
            return true;
        }
        else return false;
    }


    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log("user: " + JSON.stringify(user));

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let dataNickname = {
            Name: 'nickname',
            Value: user.name
        };
        let dataVorname = {
            Name: 'vorname',
            Value: user.vorname
        };
        let dataNachname = {
            Name: 'nachname',
            Value: user.password
        };
       
        if (this.vornameIsNull(user)){
            this.vornameError = true;}
        else
            this.vornameError = false;
          
        if (this.nachnameIsNull(user)){
                this.nachnameError = true;}
        else
                this.nachnameError = false;
        if (this.emailIsNull(user)){
            this.emailError = true;}
        else{
            this.emailError = false;
            if(this.emailInvalidCheck(user)){
                this.emailInvalid = true;
            }
            else 
                this.emailInvalid =false;
        }
            
        if (this.passwortIsNull(user)){
            this.passwordNull= true;}
        else{
            this.passwordNull = false;
            if(this.passwordLengthCheck(user)){
                this.passwordTooShort = true;
            }
            else    this.passwordTooShort = false;
        }
            
       
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

        this.cUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log("registered user: " + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}