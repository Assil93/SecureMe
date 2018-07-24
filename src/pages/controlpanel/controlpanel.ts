import {NavController} from "ionic-angular";


import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';


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
  
    constructor(public navCtrl: NavController) {

    }
  
    ionViewDidLoad(){
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