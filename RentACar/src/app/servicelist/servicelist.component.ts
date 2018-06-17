import { Component, OnInit, Input } from '@angular/core';
import {ServicesService} from '../services/servicesService/services.service'

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {
  services: any;
  vehicles: any;
  constructor(private servicesService: ServicesService ) {}

  ngOnInit() {
    this.servicesService.getServices()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      });

    this.servicesService.getVehicles()
      .subscribe(
        data => {
          this.services = data;
        },
        error => {
          console.log(error);
        });
  }

}
