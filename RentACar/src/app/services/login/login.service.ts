import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunicationService } from '../communicationservice/communication.service';
import { AppUserService } from '../AppUserService/app-user-service.service';
import { SocketserviceService } from '../socketservice/socketservice.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Configuration } from '../../Constants/constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router, private data: CommunicationService,
     private appUserService: AppUserService, private socketService: SocketserviceService) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  login(username: string, password: string) {
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

          this.appUserService.getUserByUsername(username)
            .subscribe(
              dataa => {
                this.data.changeAppUserId(dataa.Id);
                this.data.user = dataa;
                console.log('getuser succeded...');
              },
              error => {
                console.log(error);
              });
          localStorage.setItem('username', username);
          this.data.changeUsername(username);
          this.data.changeIsLoggedIn(true);
          // let role = localStorage.getItem("role");
          if (localStorage.getItem('rol') == 'Admin')
          {
            this.data.changeIsAdmin(true);
            this.data.changeIsManager(false);
            this.data.changeIsUser(false);
            this.router.navigate(['/home']);
            this.socketService.startHubConnection();
          } else if (localStorage.getItem("role")=='Manager')
          {
            this.data.changeIsAdmin(false);
            this.data.changeIsManager(true);
            this.data.changeIsUser(false);
            this.router.navigate(['/home']);
          } else if (localStorage.getItem("role")=='AppUser')
          {
            this.data.changeIsAdmin(false);
            this.data.changeIsManager(false);
            this.data.changeIsUser(true);
            this.router.navigate(['/home']);
          }

          return;
        },
        err => {
          console.log('Error occured', err);
          return;
        }
      );
    }
    return;
  }
}
