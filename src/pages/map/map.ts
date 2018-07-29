import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import { ViewChild, ElementRef } from '@angular/core';


declare var google;

@IonicPage({
  name: 'MapPage'
})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
   
    @ViewChild('map') mapElement: ElementRef;
    map: any;
   
    constructor(public navCtrl: NavController) {
   
    }
   
    ionViewDidLoad(){
      this.loadMap();
    }
   
    loadMap(){
   
      let latLng = new google.maps.LatLng(-34.9290, 138.6010);
   
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    }
  }
