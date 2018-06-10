import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { AppUserService } from '../services/AppUserService/app-user-service.service';
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  Id: string;
  myFile: File;
  constructor(private _http: HttpClient, private appUserService: AppUserService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.myFile) {
      this.appUserService.uploadIdPhoto(this.myFile, this.Id);
    }
}

fileChange(event) {
  this.myFile = <File>event.target.files[0];
    let typeOfFile = this.myFile.type.split('/');
    if (typeOfFile[0] != 'image') {
      this.myFile = null;
    }
}

}
