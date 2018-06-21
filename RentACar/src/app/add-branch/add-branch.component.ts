import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BranchService } from '../services/branchService/branch.service';
import { CommunicationService } from '../services/communicationservice/communication.service';

import { MapInfo } from '../models/map-info.model';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { BranchModel } from '../models/BranchModel';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  service: any;
  mapInfo: MapInfo;
  lat: number = 51.678418;
  lng: number = 7.809007;
  myFile: File;
  Address = '';
  constructor(private router: Router, private branchService: BranchService, private data: CommunicationService) { }

  ngOnInit() {
    this.service = this.data.service;
    this.mapInfo = new MapInfo(45.242268, 19.842954,
      'assets/ftn.png',
      'Jugodrvo' , '' , 'http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka');
  }

  addBranch(account: any, form: NgForm) {
    let branch = new BranchModel();
    branch.Latitude = this.mapInfo.centerLat;
    branch.Longitude = this.mapInfo.centerLong;
    branch.Address = this.Address;
    branch.BranchServiceId = this.service.Id;
    branch.Image = 'noimage';
    this.branchService.addBranch(branch)
        .subscribe(
          data => {
            this.branchService.uploadIdPhoto(this.myFile, data.Id)
              .subscribe(
                dataa => {
                  console.log('uploadIdPhoto succeded...');
                  this.data.service = this.service;
                  this.router.navigate(['/servicepage']);
                },
                error => {
                  console.log(error);
                });
            console.log('addBranch succeded...');
            alert("Add branch succeded."); 
          },
          error => {
            console.log(error);
          });
    form.reset();
  }

  placeMarker($event) {
    this.mapInfo.centerLat = $event.coords.lat;
    this.mapInfo.centerLong = $event.coords.lng;
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  fileChange(event) {
    this.myFile = <File>event.target.files[0];
      let typeOfFile = this.myFile.type.split('/');
      if (typeOfFile[0] != 'image') {
        this.myFile = null;
      }
  }
}
