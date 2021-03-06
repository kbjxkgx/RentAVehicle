import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VehicleModel } from '../../models/vehicleModel';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
import { VehicleFilterModel } from '../../models/vehicleFilterModel';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpClient: HttpClient) { }


   getVehicles(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Vehicle');
  }

  getVehiclesPage(pageIndex: number): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Vehicles/GetVehiclesPage/' + pageIndex);
  }

  getVehiclesPageFiltered(pageIndex: number, vehicleFilter: VehicleFilterModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Vehicles/GetVehiclesPageFiltered/' + pageIndex, vehicleFilter);
  }

  getVehiclesCount(): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Vehicles/GetVehiclesCount');
  }

  addVehicle(vehicle: VehicleModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Vehicle', vehicle);
  }

  updateVehicle(vehicle: VehicleModel): Observable<any> {
    return this.httpClient.put(Configuration.path + 'api/Vehicle/' + vehicle.Id , vehicle);
  }

  addVehicleImages(filesToUpload: File[], vehicle: VehicleModel): Observable<any> {
    let _formData = new FormData();
    _formData.append('vehicleId', vehicle.Id.toString());
    for (let file of filesToUpload) {
      _formData.append(file.name, file);
    }
    return this.httpClient.post(Configuration.path + 'api/VehicleImage/AddVehicleImages', _formData);
  }

  deleteVehicle(vehicle: VehicleModel) {
    return this.httpClient.delete(Configuration.path + 'api/Vehicle/' + vehicle.Id);
  }

  // deleteVehicleWithServiceId(serviceId: number) {
  //   let params = new HttpParams().set('serviceId', serviceId.toString());
  //   return this.httpClient.delete(Configuration.path + 'api/Vehicle/DeleteVehicleWithServiceId', { params: params }) as Observable<any>;
  // }

  ToggleVehicleAvailability(vehicleId: number) {
    let params = new HttpParams().set('vehicleId', vehicleId.toString());
    return this.httpClient.put(Configuration.path + 'api/Vehicle/ToggleVehicleAvailability/' + vehicleId, vehicleId);
  }

}
