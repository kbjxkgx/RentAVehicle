import { Component, OnInit } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { VehicleService } from '../services/vehicleService/vehicle.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers: [AppUserService]
})
export class MainpageComponent implements OnInit {
  users: any[];
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
        },
        error => {
          console.log(error);
        });
  }

}
