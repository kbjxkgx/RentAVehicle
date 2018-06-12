import { Component, OnInit, Input } from '@angular/core';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: any[];
  constructor(private appUserService: AppUserService) { }

  ngOnInit() {
    const x = this.appUserService.getUnconfirmedUsers() as Observable<any>;
    x.subscribe(
      res => {
        console.log('getManagers succeded');
        this.users = res;
      },
      err => {
        console.log('getManagers failed');
        return;
      }
    );
  }

}
