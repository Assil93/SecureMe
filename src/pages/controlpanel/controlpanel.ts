import {NavController} from "ionic-angular";


import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {Storage} from "@ionic/storage";
import {UserLoginService} from "../../providers/userLogin.service";


declare var google;

@Component({
  templateUrl: 'controlpanel.html'
})
export class ControlPanelComponent {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'berlin';
  end = 'stuttgart';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  public email;

  constructor(public navCtrl: NavController,
              private push: Push,
              private storage: Storage,
              public userService: UserLoginService) {

    const options: PushOptions = {
      android: {
        forceShow: true,
        vibrate: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    this.storage.get('email').then((val: string) => {
      console.log('Username: ', val);

      pushObject.on('registration').subscribe((registration: any) => {
        this.userService.saveToken(val.replace('.', '_'), registration.registrationId).subscribe(response => {
          },
          error => {
            console.log(error);
          });
        console.log('Device registered', registration);
      });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 52.412529, lng: 12.531644}
    });

    this.directionsDisplay.setMap(this.map);
  }

  //this.geolocation.getCurrentPosition().then((position) => {

  //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //      let mapOptions = {
  //      center: latLng,
  //    zoom: 15,
  //  mapTypeId: google.maps.MapTypeId.ROADMAP
  // }
  //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);});

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
