import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../../models/registerModel';
import { Observable } from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../../Constants/constants';
// import { MethodResult } from '../models/methodResult.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppUserModel } from '../../models/appUserModel';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   register(account: RegisterModel): Observable<any> {
   
    return this.httpClient.post(Configuration.path + 'api/Account/Register', account);
     
  }

  logout() {
    let _formData = new FormData();
    let body = _formData;
    localStorage.removeItem('username');
    return this.httpClient.post(Configuration.path + 'api/Account/Logout', body);
  }

  update(account: AppUserModel) {
    return this.httpClient.put(Configuration.path + 'api/AppUser/'+account.Id , account);
  }

}
