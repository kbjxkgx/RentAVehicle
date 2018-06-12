import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../../models/vehicleModel';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpClient: HttpClient) { }


   getVehicles(): Observable<any> {
    return this.httpClient.get('https://localhost:44313/api/Vehicle');
      // .map(this.parseData)
      // .catch(this.handleError);
  }

  addVehicle(vehicle: VehicleModel): Observable<any> {
    return this.httpClient.post('https://localhost:44313/api/Vehicle', vehicle);
      // .map(this.parseData)
      // .catch(this.handleError);
  }

  addVehicleImages(filesToUpload: File[], vehicle: VehicleModel): Observable<any> {
    let _formData = new FormData();
    _formData.append('vehicleId', vehicle.Id.toString());
    for (let file of filesToUpload) {
      _formData.append(file.name, file);
    }
    let body = _formData;
    return this.httpClient.post('https://localhost:44313/api/VehicleImage/AddVehicleImages', body);
  }
}
