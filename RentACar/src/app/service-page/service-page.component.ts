import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements OnInit {
  @Input() service: any;
  constructor() { }

  ngOnInit() {
  }

}
