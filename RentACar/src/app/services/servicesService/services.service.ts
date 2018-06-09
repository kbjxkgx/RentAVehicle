import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServiceModel } from '../../models/serviceModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   getServices(): Observable<any> {
    return this.httpClient.get('https://localhost:44313/api/Services');
      // .map(this.parseData)
      // .catch(this.handleError);
  }

  addService(service: ServiceModel): Observable<any> {
    return this.httpClient.post('https://localhost:44313/api/Services', service);
      // .map(this.parseData)
      // .catch(this.handleError);
  }


}
