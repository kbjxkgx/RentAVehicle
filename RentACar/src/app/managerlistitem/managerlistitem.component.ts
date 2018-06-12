import { Component, OnInit, Input } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';

@Component({
  selector: 'app-managerlistitem',
  templateUrl: './managerlistitem.component.html',
  styleUrls: ['./managerlistitem.component.css']
})
export class ManagerlistitemComponent implements OnInit {
  @Input() manager: any;
  constructor(private appUserService: AppUserService) { }

  ngOnInit() {
  }

  ConfirmManager() {
    this.appUserService.ConfirmManager(this.manager);
  }

}
