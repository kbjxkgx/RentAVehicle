import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
      // .map((response: Response) => <string>response.json())
      // .subscribe((data) => this.message = data);
  }

}
