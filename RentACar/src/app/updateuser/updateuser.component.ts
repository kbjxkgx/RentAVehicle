import { Component, OnInit } from '@angular/core';
import { AppUserModel } from '../models/appUserModel';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import { AccountService } from '../services/accountService/account.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  public user:AppUserModel;
  constructor(private data:CommunicationService, private userService: AppUserService, private accountService: AccountService,
  private router: Router) { }

  ngOnInit() {
    this.user=this.data.user;
  }

  Delete() {
    this.accountService.logout()
    .subscribe(
      data => {
        // vehicle.Id = data.Id;
         console.log('logout succeded');
        this.userService.Delete(this.user)
        .subscribe(
          data2 => {
            console.log('deleteuser succeded');
            this.data.changeIsAdmin(false);
            this.data.changeIsManager(false);
            this.data.changeIsUser(true);
            this.data.changeIsLoggedIn(false);
            alert("Done!");
            this.router.navigate(['/home']);
            
          },
          error => {
            console.log('deleteuser failed');
            console.log(error);
          });
       
      },
      error => {
        console.log('logout failed');
        console.log(error);
      });
  }

  updateUser(account: any, form: NgForm) {

    account.Id=this.data.user.Id;

    this.accountService.update(account)
        .subscribe(
          data => {
            console.log('update user succeded...');
            alert('Done!');
          },
          error => {
            console.log('update user failed');
          });
  }

}
