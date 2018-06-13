import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.css']
})
export class NotificationitemComponent implements OnInit {

  @Input() notification: any;
  constructor() { }

  ngOnInit() {
  }

  Seen() {

  }
}
