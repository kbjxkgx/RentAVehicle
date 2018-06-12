import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../../models/vehicleModel';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  constructor(private httpClient: HttpClient) { }

  getVehicleTypes(): Observable<any> {
    return this.httpClient.get('https://localhost:44313/api/VehicleTypes');
      // .map(this.parseData)
      // .catch(this.handleError);
  }
}
