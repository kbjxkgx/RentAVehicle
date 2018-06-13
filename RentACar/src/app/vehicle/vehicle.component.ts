import { Component, OnInit, Input } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @Input() vehicle: any;
  constructor() { }

  ngOnInit() {
  }

}
