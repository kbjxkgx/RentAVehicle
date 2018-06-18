import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/accountService/account.service';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModel } from '../models/registerModel';
import { ElementRef} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService, private appUserService: AppUserService, private router: Router) { }

  ngOnInit() {
  }

  register(account: any, form: NgForm) {
    if(account.IsManager=="") {
      account.IsManager=false;
    }
    this.accountService.register(account)
        .subscribe(
          data => {
            console.log('registration succeded...');
          },
          error => {
            console.log(error);
          });
    form.reset();
    this.router.navigate(['/login']);
  }
}
