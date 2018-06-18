import { Component, OnInit } from '@angular/core';
import { AppUserModel } from '../models/appUserModel';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { AppUserService } from '../services/AppUserService/app-user-service.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  public user:AppUserModel;
  constructor(private data:CommunicationService, private userService: AppUserService) { }

  ngOnInit() {
    this.user=this.data.user;
  }

  Delete() {
    this.userService.Delete(this.user)
    .subscribe(
      data => {
        // vehicle.Id = data.Id;
         console.log('DeleteUser succeded');
        // this.vehicleService.addVehicleImages(this.myFiles, vehicle)
        // .subscribe(
        //   data2 => {
        //     console.log('addVehicleImages succeded');
        //     form.reset();
        //   },
        //   error => {
        //     console.log('addVehicleImages failed');
        //     console.log(error);
        //   });
        alert("Done!");
      },
      error => {
        console.log('DeleteUser failed');
        console.log(error);
      });
  }

}
