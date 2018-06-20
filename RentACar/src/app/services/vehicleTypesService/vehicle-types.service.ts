import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleTypeModel } from '../../models/VehicleTypeModel';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  constructor(private httpClient: HttpClient) { }

  getVehicleTypes(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/VehicleTypes');
  }

  addVehicleType(vehicleType: VehicleTypeModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/VehicleTypes', vehicleType);
  }
}
