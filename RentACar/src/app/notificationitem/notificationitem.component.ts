import { Component, OnInit, Input } from '@angular/core';
import { NotificationserviceService } from '../services/notificationservice/notificationservice.service'

@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.css']
})
export class NotificationitemComponent implements OnInit {

  @Input() notification: any;
  constructor(private notifService: NotificationserviceService) { }

  ngOnInit() {
  }

  Seen() {
    this.notification.Seen = true;
    const x = this.notifService.notificationSeen(this.notification);

    x.subscribe(
      res => {
        console.log('notifseen succeded');
      },
      err => {
        console.log('notifseen failed');
        return;
      }
    );

  }
}
