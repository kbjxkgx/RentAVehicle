import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servicelistitem',
  templateUrl: './servicelistitem.component.html',
  styleUrls: ['./servicelistitem.component.css']
})
export class ServicelistitemComponent implements OnInit {
  @Input() service: any;
  constructor() { }

  ngOnInit() {
  }

}
