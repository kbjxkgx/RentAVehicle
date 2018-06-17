import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicleService/vehicle.service';
  import { ServicesService } from '../services/servicesService/services.service';
import { VehicleTypesService } from '../services/vehicleTypesService/vehicle-types.service';
import { ServiceModel } from '../models/serviceModel';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {
  myFiles: File[];
  services: ServiceModel[];
  vehicleTypes: any[];
  selectedService: ServiceModel;
  selectedId: string;
  constructor(private vehicleService: VehicleService, private servicesService: ServicesService,
     private vehicleTypesService: VehicleTypesService) {
    this.servicesService.getConfirmedServices()
      .subscribe(
        data => {
          this.services = data;
          console.log('getServices succeded');
        },
        error => {
          console.log('getServices failed');
          console.log(error);
        });
    this.vehicleTypesService.getVehicleTypes()
        .subscribe(
          data => {
            this.vehicleTypes = data;
            console.log('getVehicleTypes succeded');
          },
          error => {
            console.log('getVehicleTypes failed');
            console.log(error);
          });
   }

  ngOnInit() {
  }

  addVehicle(vehicle: VehicleModel, form: NgForm) {
    if (this.myFiles.length > 0 ) {
      this.vehicleService.addVehicle(vehicle)
        .subscribe(
          data => {
            vehicle.Id = data.Id;
            console.log('addVehicle succeded');
            this.vehicleService.addVehicleImages(this.myFiles, vehicle)
            .subscribe(
              data2 => {
                console.log('addVehicleImages succeded');
                form.reset();
              },
              error => {
                console.log('addVehicleImages failed');
                console.log(error);
              });
          },
          error => {
            console.log('addVehicle failed');
            console.log(error);
          });
    }
  }

  fileChange(event) {
    this.myFiles = <File[]>event.target.files;
      }
}
