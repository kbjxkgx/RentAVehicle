import { Component, OnInit, Input } from '@angular/core';
import { MapInfo } from '../models/map-info.model';


@Component({
  selector: 'app-branch-list-item',
  templateUrl: './branch-list-item.component.html',
  styleUrls: ['./branch-list-item.component.css']
})
export class BranchListItemComponent implements OnInit {

  @Input() branch: any;
  mapInfo: MapInfo;

  constructor() { }

  ngOnInit() {
    this.mapInfo = new MapInfo(this.branch.Latitude, this.branch.Longitude,
      'assets/defaultVehicleImage.jpeg',
      'Branch: ' + this.branch.Id  , '' , '');
  }

}
