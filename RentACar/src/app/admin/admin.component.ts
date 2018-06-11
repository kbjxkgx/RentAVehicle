import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/servicesService/services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ServicesService]
})
export class AdminComponent implements OnInit {

  services: any[];
  constructor(private servicesService: ServicesService) { }
  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.servicesService.getUnconfirmedServices()
      .subscribe(
        data => {
          this.services = data;
        },
        error => {
          console.log(error);
        });
  }
}
