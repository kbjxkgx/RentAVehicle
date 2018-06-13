import { Component, OnInit, Input } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';

@Component({
  selector: 'app-carlistitem',
  templateUrl: './carlistitem.component.html',
  styleUrls: ['./carlistitem.component.css']
})
export class CarlistitemComponent implements OnInit {

  @Input() vehicle: VehicleModel;
  @Input() imagePath: string;
  constructor() { }

  ngOnInit() {
  }

}
