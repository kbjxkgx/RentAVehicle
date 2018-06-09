import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicleService/vehicle.service';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  addVehicle(account: VehicleModel, form: NgForm) {
    this.vehicleService.addVehicle(account)
      .subscribe(
        error => {
          console.log(error);
        });
  }
}
