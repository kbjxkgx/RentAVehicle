import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   login(username: string, password: string): void {
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    let parameters = '';
    parameters = parameters.concat('username=');
    parameters = parameters.concat(username);
    parameters = parameters.concat('&password=');
    parameters = parameters.concat(password);
    parameters = parameters.concat('&grant_type=password');
    if (!localStorage.jwt) {
       const x = this.httpClient.post('http://localhost:51680/oauth/token',
       parameters, {'headers': headers}) as Observable<any>;

      x.subscribe(
        res => {
          console.log(res.access_token);
          const jwt = res.access_token;

          const jwtData = jwt.split('.')[1];
          const decodedJwtJsonData = window.atob(jwtData);
          const decodedJwtData = JSON.parse(decodedJwtJsonData);

          const role = decodedJwtData.role;

          console.log('jwtData: ' + jwtData);
          console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
          console.log('decodedJwtData: ' + decodedJwtData);
          console.log('Role ' + role);

          localStorage.setItem('jwt', jwt);
          localStorage.setItem('role', role);
        },
        err => {
          console.log('Error occured');
        }
      );
    }
  }
}
