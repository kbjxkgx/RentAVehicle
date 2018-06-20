import { Component, OnInit, Input } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { Configuration } from '../Constants/constants';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CommunicationService } from '../services/communicationservice/communication.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @Input() vehicle: VehicleModel;
  public isVisible = true;
  public isLoggedIn: boolean;
   public isManager: boolean;
   public isUser: boolean;

  constructor(private router: Router, private data: CommunicationService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);
  }

  Delete() {
      this.vehicleService.deleteVehicle(this.vehicle)
        .subscribe(
          data => {
            console.log('delete vehicle succeded...');
            this.isVisible = false;
          },
          error => {
            console.log('delete vehicle failed...');
          });
  }

  Update() {
    this.data.changeVehicleForUpdate(this.vehicle);
    this.router.navigate(['/updateVehicle']);
  }

  MakeReservation() {
    this.data.vehicle = this.vehicle;
    this.router.navigate(['/makereservation']);
  }

  Configuration() {
    return Configuration.path;
  }

  ToggleVehicleAvailability() {
    this.vehicleService.ToggleVehicleAvailability(this.vehicle.Id)
        .subscribe(
          data => {
            console.log('toggle vehicle succeded...');
            this.vehicle.IsAvailable = !this.vehicle.IsAvailable;
          },
          error => {
            console.log('toggle vehicle failed...');
          });
  }

}
