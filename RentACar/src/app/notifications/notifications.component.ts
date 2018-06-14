import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationserviceService } from '../services/notificationservice/notificationservice.service';
import { SocketserviceService } from '../services/socketservice/socketservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;
  constructor(private notificationService: NotificationserviceService, private ngZone: NgZone,
     private socketService: SocketserviceService) { }

  ngOnInit() {

    this.subscribeForNotifications();

    this.notificationService.getNotifications()
    .subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.log(error);
      });
  }

  private subscribeForNotifications () {
    this.socketService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: any) {

    this.ngZone.run(() => {
      this.notificationService.getNotifications()
    .subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.log(error);
      });
    });
  }

}
