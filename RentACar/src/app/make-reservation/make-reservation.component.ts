import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '../models/vehicleModel';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { BranchService } from '../services/branchService/branch.service';
import { ReservationService } from '../services/reservationService/reservation.service';
import { ReservationModel } from '../models/ReservationModel';
import {NgForm} from '@angular/forms';
import { ServicesService } from '../services/servicesService/services.service';
@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit {
  vehicle: VehicleModel;
  service: any;
  branches: any;
  reservations: any[];
  BeginTime: Date;
  EndTime: Date;
  selectedBranchId1 = -1;
  selectedBranchId2 = -1;
  constructor(private data: CommunicationService, private branchService: BranchService,
     private servicesService: ServicesService, private reservationService: ReservationService) { }

  ngOnInit() {
    this.vehicle = this.data.vehicle;

    this.servicesService.getService(this.vehicle.VehicleServiceId)
      .subscribe(
        data => {
          this.service = data;
          console.log('getService succeded...');
        },
        error => {
          console.log(error);
        });
    this.branchService.getBranchesOfService(this.vehicle.VehicleServiceId)
      .subscribe(
        data => {
          this.branches = data;
          console.log('getBranchesOfService succeded...');
        },
        error => {
          console.log(error);
        });
    this.reservationService.getReservationsOfVehicle(this.vehicle.Id)
      .subscribe(
        data => {
          this.reservations = data as Array<any>;
          console.log('getReservationsOfVehicle succeded...');
        },
        error => {
          console.log(error);
        });
  }

  makeReservation(account: any, form: NgForm) {
    let reservation = new ReservationModel();
    reservation.BeginTime = this.BeginTime;
    reservation.EndTime = this.EndTime;
    reservation.BranchTakeId = this.selectedBranchId1;
    reservation.BranchDropOffId = this.selectedBranchId2;
    reservation.ReservedVehicleId = this.vehicle.Id;
    reservation.UserId = this.data.AppUserIdSource.value;
    this.reservationService.makeReservation(reservation)
      .subscribe(
        data => {
          window.alert('Reservation succeded...');
          console.log('makeReservation succeded...');
          this.reservations.push(reservation);
        },
        error => {
          window.alert(error.error.Message);
          console.log(error);
        });

  }

  changeSelectedBranch1(branchId: number) {
    this.selectedBranchId1 = branchId;
  }

  changeSelectedBranch2(branchId: number) {
    this.selectedBranchId2 = branchId;
  }

  changeSelection1($event) {
    // this.mapInfo.centerLat = $event.coords.lat;
    // this.mapInfo.centerLong = $event.coords.lng;
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  changeSelection2($event) {
    // this.mapInfo.centerLat = $event.coords.lat;
    // this.mapInfo.centerLong = $event.coords.lng;
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

}
