import { Component, OnInit, Input } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-managerlist',
  templateUrl: './managerlist.component.html',
  styleUrls: ['./managerlist.component.css']
})
export class ManagerlistComponent implements OnInit {
  managers: any[];

  constructor(private appUserService: AppUserService) { }

  ngOnInit() {
    const x = this.appUserService.getManagers() as Observable<any>;
    x.subscribe(
      res => {
        console.log('getManagers succeded');
        this.managers = res;
      },
      err => {
        console.log('getManagers failed');
        return;
      }
    );
  }

}
