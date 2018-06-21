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

  service: ServiceModel;
  constructor(private data: CommunicationService, private serviceService: ServicesService) { }

  ngOnInit() {
    this.service=this.data.serviceForUpdate;
  }

  updateService(service: any, form: NgForm) {
    this.service.Name=service.Name;
    this.service.Description=service.Description;
    this.service.Email=service.Email;

    this.serviceService.update(this.service)
        .subscribe(
          data => {
            console.log('update service succeded...');
            alert('Done!');
          },
          error => {
            console.log('update service failed');
          });
  }

}
