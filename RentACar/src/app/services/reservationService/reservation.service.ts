import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
import { ReservationModel } from '../../models/ReservationModel';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  makeReservation(reservation: ReservationModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Reservation', reservation);
  }

  getReservationsOfVehicle(vehicleId: number): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Reservations/GetReservationsOfVehicle/' + vehicleId);
  }

  getReservationsOfUser(userId: number): Observable<any> {
    return this.httpClient.get(Configuration.path + 'api/Reservations/GetReservationsOfUser/' + userId);
  }

  payedReservations(userId: number): Observable<any>{
    let url = '';
    url = url.concat(Configuration.path + 'api/Reservations/PayedReservationsOfUser/');
    url = url.concat(userId.toString());
    
    return this.httpClient.put(url, userId);
  }

}
