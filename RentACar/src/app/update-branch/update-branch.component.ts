import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { MapInfo } from '../models/map-info.model';
import {NgForm} from '@angular/forms';
import { BranchModel } from '../models/BranchModel';
import { BranchService } from '../services/branchService/branch.service';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent implements OnInit {
  branch: any;
  mapInfo: MapInfo;
  myFile: File;
  Address = '';
  constructor(private data: CommunicationService, private branchService: BranchService) { }

  ngOnInit() {
    this.branch = this.data.branch;
    this.mapInfo = new MapInfo(this.branch.Latitude, this.branch.Longitude,
      'assets/ftn.png',
      this.branch.Id, '' , this.branch.Address);
  }

  UpdateBranch(account: any, form: NgForm) {
    if(this.myFile) {
      let branch = new BranchModel();
      branch.Id = this.branch.Id;
      branch.Latitude = this.mapInfo.centerLat;
      branch.Longitude = this.mapInfo.centerLong;
      branch.Address = this.Address;
      branch.BranchServiceId = this.branch.BranchServiceId;
      branch.Image = 'noimage';
      this.branchService.updateBranch(branch)
          .subscribe(
            data => {
              this.branchService.uploadIdPhoto(this.myFile, this.branch.Id)
                .subscribe(
                  dataa => {
                    console.log('uploadIdPhoto succeded...');
                  },
                  error => {
                    console.log(error.error.Message);
                  });
              console.log('addBranch succeded...');
              alert('Add branch succeded.');
            },
            error => {
              console.log(error.error.Message);
            });
      form.reset();
    } else {
      alert('Branch image is required');
    }
  }

  placeMarker($event) {
    this.mapInfo.centerLat = $event.coords.lat;
    this.mapInfo.centerLong = $event.coords.lng;
  }

  fileChange(event) {
    this.myFile = <File>event.target.files[0];
      let typeOfFile = this.myFile.type.split('/');
      if (typeOfFile[0] != 'image') {
        this.myFile = null;
      }
  }

}
