import { Component, OnInit, Input } from '@angular/core';
import {ServicesService} from '../services/servicesService/services.service'

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {
  @Input() services: any;
  constructor(private servicesService: ServicesService ) {}

  ngOnInit() {
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
