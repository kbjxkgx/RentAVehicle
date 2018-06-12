import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppUserModel } from '../../models/appUserModel';

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
    return this.httpClient.get('http://localhost:51680/api/AppUser');
  }

  uploadIdPhoto(fileToUpload: File, Id: string): Observable<any> {
    let _formData = new FormData();
    _formData.append('Id', Id);
    _formData.append('MyFile', fileToUpload);
    let body = _formData;
    // let headers = new Headers();
    // let options = new RequestOptions({
    //     headers: headers
    // });
    return this.httpClient.post('https://localhost:44313/api/AppUser/VerifyUser', body);
  }

  getManagers(): any {
    return this.httpClient.get('https://localhost:44313/api/AppUsers/getManagers') as Observable<any>;
    // x.subscribe(
    //   res => {
    //     console.log('getManagers succeded');
    //     return res;
    //   },
    //   err => {
    //     console.log('Error occured');
    //     return;
    //   }
    // );
  }

  getUserByUsername(Username: string): any {
    let params = new HttpParams().set('Username', localStorage.getItem('username'));

    return this.httpClient.get('https://localhost:44313/api/AppUser/GetAppUserByUsername', { params: params }) as Observable<any>;
    // x.subscribe(
    //   res => {
    //     console.log('getManagers succeded');
    //     return res;
    //   },
    //   err => {
    //     console.log('Error occured');
    //     return;
    //   }
    // );
  }

  ConfirmManager(user: AppUserModel): any {
    let url = '';
    url = url.concat('https://localhost:44313/api/AppUser/');
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
    return this.httpClient.get('https://localhost:44313/api/AppUsers/UnconfirmedUsers') as Observable<any>;
  }

  ConfirmUser(user: AppUserModel) {
    let url = '';
    url = url.concat('https://localhost:44313/api/AppUser/');
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
