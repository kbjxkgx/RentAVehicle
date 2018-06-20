import { Component, OnInit, Input } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { ServiceModel } from '../models/serviceModel';
import { VehicleTypesService } from '../services/vehicleTypesService/vehicle-types.service';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { ServicesService } from '../services/servicesService/services.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.component.html',
  styleUrls: ['./updatevehicle.component.css']
})
export class UpdatevehicleComponent implements OnInit {
  myFiles: File[];
  services: ServiceModel[];
  vehicleTypes: any[];
  selectedService: ServiceModel;
  public vehicle: VehicleModel;

  constructor(private data: CommunicationService, private vehicleService: VehicleService, private servicesService: ServicesService,
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
    this.vehicle = this.data.VehicleForUpdate.value;
  }

  updateVehicle(vehicleM: VehicleModel, form: NgForm) {
      vehicleM.Id = this.vehicle.Id;

      this.vehicleService.updateVehicle(vehicleM)
        .subscribe(
          data => {
             console.log('updateVehicle succeded');
             this.vehicleService.addVehicleImages(this.myFiles, vehicleM)
                .subscribe(
                  data2 => {
                    console.log('addVehicleImages succeded');
                    window.alert('vehicle added');
                    form.reset();
                  },
                  error => {
                    console.log('addVehicleImages failed');
                    console.log(error);
                  });
          },
          error => {
            console.log('updateVehicle failed');
            console.log(error);
          });
  }

  fileChange(event) {
    this.myFiles = <File[]>event.target.files;
      }

}
