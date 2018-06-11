import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../../models/registerModel';
import { Observable } from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MethodResult } from '../models/methodResult.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
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
    // let headers = new HttpHeaders();
    // headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    // let parameters = '';
    // parameters = parameters.concat('FullName=');
    // parameters = parameters.concat(account.FullName);
    // parameters = parameters.concat('&LastName=');
    // parameters = parameters.concat(account.LastName);
    // // parameters = parameters.concat('&BirthDay=');
    // // parameters = parameters.concat(account.BirthDay);
    // parameters = parameters.concat('&Email=');
    // parameters = parameters.concat(account.Email);
    // parameters = parameters.concat('&Password=');
    // parameters = parameters.concat(account.Password);
    // parameters = parameters.concat('&ConfirmPassword=');
    // parameters = parameters.concat(account.ConfirmPassword);
    return this.httpClient.post('https://localhost:44313/api/Account/Register', account);
      // .map(this.parseData)
      // .catch(this.handleError);
  }

  logout() {
    let _formData = new FormData();
    let body = _formData;
    return this.httpClient.post('https://localhost:44313/api/Account/Logout', body);
  }
}
