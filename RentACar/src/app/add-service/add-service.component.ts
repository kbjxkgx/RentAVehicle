import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../models/ServiceModel';
import { ServicesService } from '../services/servicesService/services.service';
import { CommunicationService } from '../services/communicationservice/communication.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  myFile: File;
  constructor(private serviceService: ServicesService, private data: CommunicationService) { }

  ngOnInit() {
  }

  addService(service: ServiceModel, form: NgForm) {
    if (this.myFile) {
      service.LogoImagePath = 'noimage';
      service.ServiceManagerId = this.data.AppUserIdSource.value;
      this.serviceService.addService(service)
        .subscribe(
          data => {
            service.Id = data.Id;
            console.log('addVehicle succeded');
            this.serviceService.uploadServiceImage(this.myFile, service.Id.toString())
            .subscribe(
              data2 => {
                console.log('addVehicleImages succeded');
                form.reset();
              },
              error => {
                console.log('addVehicleImages failed');
                alert(error.error.Message);
              });
          },
          error => {
            console.log('addVehicle failed');
            alert(error.error.Message);
          });
    }
    else
    {
      window.alert('File is required.');
    }
  }

  fileChange(event) {
    this.myFile = <File>event.target.files[0];
      let typeOfFile = this.myFile.type.split('/');
      if (typeOfFile[0] != 'image') {
        this.myFile = null;
      }
    }
}
