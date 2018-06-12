import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { ServicesService } from '../services/servicesService/services.service';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private servicesService: ServicesService) { }
  myFiles: File[];
  services: any[];
  ngOnInit() {
    this.servicesService.getServices()
      .subscribe(
        data => {
          console.log('getServices succeded');
          this.services = data;
        },
        error => {
          console.log('getServices failed');
          console.log(error);
        });
  }

  addVehicle(account: VehicleModel, form: NgForm) {
    this.vehicleService.addVehicle(account)
      .subscribe(
        data => {
          console.log('addVehicle succeded');
          form.reset();
        },
        error => {
          console.log('addVehicle failed');
          console.log(error);
        });
  }

  fileChange(event) {
    this.myFiles = <File[]>event.target.files;
      }
}
