import { Component, OnInit } from '@angular/core';
import { VehicleTypesService } from '../services/vehicleTypesService/vehicle-types.service';
import { VehicleTypeModel } from '../models/VehicleTypeModel';

@Component({
  selector: 'app-vehicle-types',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.css']
})
export class VehicleTypesComponent implements OnInit {

  vehicleTypes: any[];
  vehicleTypeName: string;
  constructor(private vehicleTypesService: VehicleTypesService) { }

  ngOnInit() {
    this.vehicleTypesService.getVehicleTypes()
        .subscribe(
          data => {
            this.vehicleTypes = data as Array<any>;
            console.log('getVehicleTypes succeded');
          },
          error => {
            console.log('getVehicleTypes failed');
            console.log(error);
          });
  }

  AddType() {
    let vehicleType = new VehicleTypeModel();
    vehicleType.Name = this.vehicleTypeName;
    this.vehicleTypesService.addVehicleType(vehicleType)
        .subscribe(
          data => {
            this.vehicleTypes.push(vehicleType);
            console.log('addVehicleType succeded');
          },
          error => {
            console.log('addVehicleType failed');
            console.log(error);
          });
  }

}
