import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/accountService/account.service';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModel } from '../models/registerModel';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  register(account: any, form: NgForm) {
    this.accountService.register(account)
      .subscribe(
        error => {
          console.log(error);
        });
  }
}
