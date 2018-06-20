import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { PagerService } from '../services/pagerService/PagerService';
import { VehicleTypesService } from '../services/vehicleTypesService/vehicle-types.service';
import { VehicleModel } from '../models/vehicleModel';
import { VehicleFilterModel } from '../models/vehicleFilterModel';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any[];
  vehicleTypes: any[];
  vehicleFilter: VehicleFilterModel;
  isSearchActive = false;
  numberOfVehicles = 0;
  // pager object
  pager: any = {};
  constructor(private vehicleService: VehicleService, private pagerService: PagerService,
     private vehicleTypesService: VehicleTypesService) { }

  ngOnInit() {
    // this.getVehicles();

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

    this.setPage(1);
  }

  // getVehicles() {

  //   this.vehicleService.getVehiclesCount()
  //     .subscribe(
  //       data => {
  //         this.numberOfVehicles = data;
  //         console.log('getVehiclesCount succeded');
  //         this.setPage(1);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  setPage(page: number) {
    // get pager object from service

    if (this.isSearchActive)
    {
      this.vehicleService.getVehiclesPageFiltered(page, this.vehicleFilter)
        .subscribe(
          data => {
            this.vehicles = data.Vehicles;
            this.numberOfVehicles = data.Count;
            this.pager = this.pagerService.getPager(this.numberOfVehicles, page, 4);
            console.log('getVehiclesPageFiltered succeded');
          },
          error => {
            console.log(error);
          });
    } else {
      this.vehicleService.getVehiclesPage(page)
      .subscribe(
        data => {
          this.vehicles = data.Vehicles;
          this.numberOfVehicles = data.Count;
          this.pager = this.pagerService.getPager(this.numberOfVehicles, page, 4);
          console.log('getVehiclesPage succeded');
        },
        error => {
          console.log(error);
        });
    }

  }

  Search(vehicle: VehicleFilterModel, form: NgForm) {
    this.isSearchActive = true;
    this.vehicleFilter = vehicle;
    this.vehicleService.getVehiclesPageFiltered(1, vehicle)
      .subscribe(
        data => {
          this.vehicles = data.Vehicles;
          this.numberOfVehicles = data.Count;
          console.log('getVehiclesPageFiltered succeded');
        },
        error => {
          console.log(error);
        });
  }



}
