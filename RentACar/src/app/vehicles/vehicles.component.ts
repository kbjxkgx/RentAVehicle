import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicleService/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any[];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles()
      .subscribe(
        data => {
          this.vehicles = data;
          console.log('getVehicles succeded');
        },
        error => {
          console.log(error);
        });
  }

}
