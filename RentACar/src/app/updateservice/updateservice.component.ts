import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../services/communicationservice/communication.service';
import {NgForm} from '@angular/forms';
import { ServicesService } from '../services/servicesService/services.service';
import { ServiceModel } from '../models/serviceModel';

@Component({
  selector: 'app-updateservice',
  templateUrl: './updateservice.component.html',
  styleUrls: ['./updateservice.component.css']
})
export class UpdateserviceComponent implements OnInit {
  myFile: File;
  service: ServiceModel;
  constructor(private data: CommunicationService, private serviceService: ServicesService) { }

  ngOnInit() {
    this.service = this.data.serviceForUpdate;
  }

  updateService(service: any, form: NgForm) {
    if(this.myFile)
    {
      this.service.Name = service.Name;
      this.service.Description = service.Description;
      this.service.Email = service.Email;

      this.serviceService.update(this.service)
          .subscribe(
            data => {
              this.serviceService.uploadServiceImage(this.myFile, this.service.Id.toString())
              .subscribe(
                data2 => {
                  alert('update service succeded');
                  form.reset();
                },
                error => {
                  console.log('update service failed');
                  alert(error.error.Message);
                });
            },
            error => {
              console.log(error.error.Message);
            });
    } else {
      alert('Image is required');
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
