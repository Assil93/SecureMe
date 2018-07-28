import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosDetailsPage } from './sos-details';

@NgModule({
  declarations: [
    SosDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SosDetailsPage),
  ],
})
export class SosDetailsPageModule {}
