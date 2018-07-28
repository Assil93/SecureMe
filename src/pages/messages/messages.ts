import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MessagesPage'
})
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

//mock victims
  list = {
    "victim":[
      { "id": "1", "name": "Tim Schmidt", "state": "done", "time":"vor 30 Sekunden","reason":"health"}, 
      { "id": "2", "name": "Tom Müller", "state": "inProgress",  "time":"vor 40 Sekunden", "reason":"police"}, 
      { "id": "3",  "name": "Marie Fischer", "state": "inProgress" , "time":"vor 56 Sekunden", "reason":"fire"},
      { "id": "4", "name": "Ilona Schneider", "state": "inProgress", "time":"vor 1 Minute", "reason":"police"}, 
      { "id": "5", "name": "Katharina Neumann", "state": "cancelled", "time":"vor 1 Minute", "reason":"fire"}, 
      { "id": "6", "name": "Thomas Hofmann", "state": "inProgress", "time":"vor 2 Minuten", "reason":"police"},
      { "id": "7", "name": "Achim Werner", "state": "done", "time":"vor 5 Minuten", "reason":"health"}, 
      { "id": "8", "name": "Alex Wolf", "state": "done", "time":"vor 1 Stunde", "reason":"fire"}, 
      { "id": "9", "name": "Nora Koch", "state": "inProgress", "time":"vor 3 Stunden", "reason":"fire"},
      { "id": "10", "name": "Katharina Neumann", "state": "cancelled", "time":"vor 5 Stunden", "reason":"fire"}, 
      { "id": "11", "name": "Max Hofmann", "state": "inProgress", "time":"vor 8 Stunden", "reason":"fire"},
      { "id": "12", "name": "Andre Klein", "state": "done", "time":"vor 15 Stunden", "reason":"police"}, 
      { "id": "13", "name": "Alf Wolf", "state": "done", "time":"vor 1 Tag", "reason":"fire"}, 
      { "id": "14", "name": "Opfer 9", "state": "inProgress", "time":"vor 2 Tage", "reason":"fire"},
      { "id": "15", "name": "Katharina Neumann", "state": "cancelled", "time":"vor 5 Tage", "reason":"health"}, 
      { "id": "16", "name": "Max Hofmann", "state": "inProgress", "time":"vor 6 Tage", "reason":"fire"},
      { "id": "17", "name": "Andre Klein", "state": "done", "time":"vor 8 Tage", "reason":"fire"}, 
      { "id": "18", "name": "Alf Wolf", "state": "done", "time":"vor 10 Tage", "reason":"police"}, 
      { "id": "19", "name": "Opfer 9", "state": "inProgress", "time":"vor 12 Tage", "reason":"health"},
  ] 
 }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  
 // TO-DO: Push only id and direction and hold other attributes in DatailsPage
  pushDetailsPage(id, name, state, reason){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push('SosDetailsPage', {
      id: id,
      name: name, 
      sate:state, 
      reason: reason
    });
  }


}
