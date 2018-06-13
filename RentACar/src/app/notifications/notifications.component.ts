import { Component, OnInit } from '@angular/core';
import { NotificationserviceService } from '../services/notificationservice/notificationservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;
  constructor(private notificationService: NotificationserviceService) { }

  ngOnInit() {
    this.notificationService.getNotifications()
    .subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.log(error);
      });
  }

}
