import { Component, OnInit, Input } from '@angular/core';
import { MapInfo } from '../models/map-info.model';
import { Configuration } from '../Constants/constants';
import { CommunicationService } from '../services/communicationservice/communication.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { BranchService } from '../services/branchService/branch.service';


@Component({
  selector: 'app-branch-list-item',
  templateUrl: './branch-list-item.component.html',
  styleUrls: ['./branch-list-item.component.css']
})
export class BranchListItemComponent implements OnInit {

  @Input() branch: any;
  mapInfo: MapInfo;
  public isVisible: boolean;

  constructor(private data: CommunicationService, private router: Router, private branchService: BranchService) { }

  ngOnInit() {
    this.mapInfo = new MapInfo(this.branch.Latitude, this.branch.Longitude,
      'assets/defaultVehicleImage.jpeg',
      'Branch: ' + this.branch.Id  , '' , '');
      this.isVisible = true;
  }

  Configuration() {
    return Configuration.path;
  }

  UpdateBranch() {
    this.data.branch = this.branch;
    this.router.navigate(['/updatebranch']);
  }

  DeleteBranch() {
    this.branchService.delete(this.branch)
    .subscribe(
      data => {
        console.log('Delete branch succeded');
        alert('Done.');
        this.isVisible = false;
      },
      error => {
        console.log('Delete branch failed');
        console.log(error);
        alert('Delete branch succeded');
      });
  }

}
