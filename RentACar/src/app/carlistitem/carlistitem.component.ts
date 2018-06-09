import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carlistitem',
  templateUrl: './carlistitem.component.html',
  styleUrls: ['./carlistitem.component.css']
})
export class CarlistitemComponent implements OnInit {

  @Input() vehicle: any;
  constructor() { }

  ngOnInit() {
  }

}
