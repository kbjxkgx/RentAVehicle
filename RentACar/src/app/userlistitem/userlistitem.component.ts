import { Component, OnInit, Input } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { Configuration } from '../Constants/constants';
@Component({
  selector: 'app-userlistitem',
  templateUrl: './userlistitem.component.html',
  styleUrls: ['./userlistitem.component.css']
})
export class UserlistitemComponent implements OnInit {
  @Input() user: any;
  constructor(private appUserService: AppUserService) { }

  ngOnInit() {
  }

  ConfirmUser() {
    this.appUserService.ConfirmUser(this.user);
  }

  Configuration() {
    return Configuration.path;
  }
}
