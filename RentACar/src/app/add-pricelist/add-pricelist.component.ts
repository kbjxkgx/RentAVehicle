import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/servicesService/services.service';
import { PricelistService } from '../services/pricelistService/pricelist-service.service';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { VehicleModel } from '../models/vehicleModel';
import { PricelistModel } from '../models/PricelistModel';
import { ItemModel } from '../models/ItemModel';

@Component({
  selector: 'app-add-pricelist',
  templateUrl: './add-pricelist.component.html',
  styleUrls: ['./add-pricelist.component.css']
})
export class AddPricelistComponent implements OnInit {
  service: any;
  vehicles: VehicleModel[];
  pricelist = new PricelistModel();
  constructor(private servicesService: ServicesService, private pricelistService: PricelistService, private data: CommunicationService) { }

  ngOnInit() {
    this.service = this.data.service;
    this.servicesService.getVehicles(this.service.Id)
      .subscribe(
        data => {
          this.vehicles = data;
          console.log('getVehicles succeded...');
        },
        error => {
          console.log(error);
        });
  }

  AddPricelist() {
    this.pricelist.Items = new Array();
    this.pricelist.PricelistServiceId = this.service.Id;
    for (let vehicle of this.vehicles) {
      let item = new ItemModel();
      item.ItemVehicleId = vehicle.Id;
      item.Price = vehicle.PricePerHour;
      this.pricelist.Items.push(item);
    }
    this.pricelistService.addPricelist(this.pricelist)
          .subscribe(
            data => {
              alert('Add pricelist succeded.');
              console.log('addPricelist succeded...');
            },
            error => {
              console.log(error);
              alert(error.error.Message);
            });

  }

}
