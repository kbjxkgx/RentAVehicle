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
    if (localStorage.getItem('jwt'))
    {
      this.data.changeIsLoggedIn(true);
      // let role = localStorage.getItem("role");
      if (localStorage.getItem("role")=='Admin')
      {
        this.data.changeIsAdmin(true);
        this.data.changeIsManager(false);
        this.data.changeIsUser(false);
        this.router.navigate(['/admin']);
      } else if (localStorage.getItem("role")=='Manager')
      {
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(true);
        this.data.changeIsUser(false);
        this.router.navigate(['/manager']);
      } else if (localStorage.getItem("role")=='AppUser')
      {
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(false);
        this.data.changeIsUser(true);
        this.router.navigate(['/home']);
      }
    }
    else{ 
        this.data.changeIsLoggedIn(false);
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(false);
        this.data.changeIsUser(false);
    }
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
