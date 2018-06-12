import { Component, OnInit } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { CommunicationService } from '../services/communicationservice/communication.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers: [AppUserService]
})
export class MainpageComponent implements OnInit {
  users: any[];
  vehicles: any[];
  constructor(private vehicleService: VehicleService, private router: Router, private data: CommunicationService) { }
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
