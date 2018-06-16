import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppUserModel } from '../../models/appUserModel';
import { Configuration } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   getMethodDemo(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/AppUser');
  }

  uploadIdPhoto(fileToUpload: File, Id: string): Observable<any> {
    let _formData = new FormData();
    _formData.append('Id', Id);
    _formData.append('MyFile', fileToUpload);
    return this.httpClient.post(Configuration.path + 'api/AppUser/VerifyUser', _formData);
  }

  getManagers(): any {
    return this.httpClient.get(Configuration.path + 'api/AppUsers/getManagers') as Observable<any>;
  }

  getUserByUsername(Username: string): any {
    let params = new HttpParams().set('Username', Username);

    return this.httpClient.get(Configuration.path + 'api/AppUser/GetAppUserByUsername', { params: params }) as Observable<any>;
  }

  ConfirmManager(user: AppUserModel): any {
    let url = '';
    url = url.concat(Configuration.path + 'api/AppUser/');
    url = url.concat(user.Id.toString());
    const x = this.httpClient.put(url, user) as Observable<any>;

    x.subscribe(
      res => {
        console.log('getManagers succeded');
        user.IsManagerAllowed = !user.IsManagerAllowed;
        return res;
      },
      err => {
        console.log('Error occured');
        return;
      }
    );
  }

  getUnconfirmedUsers() {
    return this.httpClient.get(Configuration.path + 'api/AppUsers/UnconfirmedUsers') as Observable<any>;
  }

  ConfirmUser(user: AppUserModel) {
    let url = '';
    url = url.concat(Configuration.path + 'api/AppUser/');
    url = url.concat(user.Id.toString());
    user.IsUserConfirmed = true;
    const x = this.httpClient.put(url, user) as Observable<any>;

    x.subscribe(
      res => {
        console.log('getManagers succeded');
        return res;
      },
      err => {
        console.log('Error occured');
        user.IsUserConfirmed = false;
        return;
      }
    );
  }

}
