import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../services/vehicleService/vehicle.service';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  @Input() vehicles: any[];
  constructor() { }

  ngOnInit() {
  }

}
