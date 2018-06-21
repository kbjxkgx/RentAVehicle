import { Component, OnInit, Input } from '@angular/core';
import { MapInfo } from '../models/map-info.model';
import { Configuration } from '../Constants/constants';
import { CommunicationService } from '../services/communicationservice/communication.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-branch-list-item',
  templateUrl: './branch-list-item.component.html',
  styleUrls: ['./branch-list-item.component.css']
})
export class BranchListItemComponent implements OnInit {

  @Input() branch: any;
  mapInfo: MapInfo;

  constructor(private data: CommunicationService, private router: Router) { }

  ngOnInit() {
    this.mapInfo = new MapInfo(this.branch.Latitude, this.branch.Longitude,
      'assets/defaultVehicleImage.jpeg',
      'Branch: ' + this.branch.Id  , '' , '');
  }

  Configuration() {
    return Configuration.path;
  }

  UpdateBranch() {
    this.data.branch = this.branch;
    this.router.navigate(['/updatebranch']);
  }

}
