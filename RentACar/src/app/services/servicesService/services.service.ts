import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceModel } from '../../models/serviceModel';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
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
    return this.httpClient.get(Configuration.path + 'api/Services');
  }

  getVehicles(Id: number) {
    let params = new HttpParams().set('Id', Id.toString());
    return this.httpClient.get(Configuration.path + 'api/Services/getVehicles', { params: params }) as Observable<any>;
  }

  getUnconfirmedServices(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Services/UnconfirmedServices');
  }

  getConfirmedServices(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Services/ConfirmedServices');
  }

  addService(service: ServiceModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Services', service);
      // .map(this.parseData)
      // .catch(this.handleError);
  }

  ConfirmService(service: ServiceModel) {
    let url = '';
    url = url.concat(Configuration.path + 'api/Services/');
    url = url.concat(service.Id.toString());
    const x = this.httpClient.put(url, service) as Observable<any>;
    x.subscribe(
      res => {
          console.log('Confirm service succeded');
      },
      error => {
        console.log('Confirm service failed');
      });
  }

  uploadServiceImage(fileToUpload: File, Id: string): Observable<any> {
    let _formData = new FormData();
    _formData.append('Id', Id);
    _formData.append('MyFile', fileToUpload);
    return this.httpClient.post(Configuration.path + 'api/Service/UploadImage', _formData);
  }


}
