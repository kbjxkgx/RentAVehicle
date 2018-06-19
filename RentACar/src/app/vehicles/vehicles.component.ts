import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { PagerService } from '../services/pagerService/PagerService';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any[];
  numberOfVehicles = 0;
  // pager object
  pager: any = {};
  constructor(private vehicleService: VehicleService, private pagerService: PagerService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {

    this.vehicleService.getVehiclesCount()
      .subscribe(
        data => {
          this.numberOfVehicles = data;
          console.log('getVehiclesCount succeded');
          this.vehicleService.getVehiclesPage(1)
            .subscribe(
              dataa => {
                this.vehicles = dataa;
                console.log('getVehiclesPage succeded');
                this.setPage(1);
              },
              error => {
                console.log(error);
              });

        },
        error => {
          console.log(error);
        });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.numberOfVehicles, page, 4);

    this.vehicleService.getVehiclesPage(page)
      .subscribe(
        data => {
          this.vehicles = data;
          console.log('getVehiclesPage succeded');
        },
        error => {
          console.log(error);
        });

    // get current page of items
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
