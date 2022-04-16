import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fcm :FCM,
    public platform:Platform,
    private toastService: ToastService

  ) {
   this.platform.ready().then(() => {
     toastService.presentToast("platform ready")
     this.fcm.onNotification().subscribe(res => {
       if(res.wasTapped) {
         console.log("Notification received in background");
           toastService.presentToast("received in background");
       } else {
         console.log("Notification received in forground");
         toastService.presentToast("received in forground");
       }
     })
   })
  }

}
