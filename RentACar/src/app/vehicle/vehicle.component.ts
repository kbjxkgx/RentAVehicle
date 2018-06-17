import { Component, OnInit, Input } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import { VehicleService } from '../services/vehicleService/vehicle.service';
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
  public isVisible:boolean = true;
  public isLoggedIn: boolean;
   public isManager: boolean;

  constructor(private router: Router, private data: CommunicationService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
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

}
