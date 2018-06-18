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
}
