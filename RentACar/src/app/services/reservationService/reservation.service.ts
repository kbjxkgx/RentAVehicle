import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
import { ReservationModel } from '../../models/ReservationModel';
import { TransactionElementModel } from '../../models/TransactionElementModel';
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  modelelement: TransactionElementModel;

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

  payedReservations(userId: number, paymentID: string): Observable<any>{
    // let url = '';
    // url = url.concat(Configuration.path + 'api/Reservations/PayedReservationsOfUser/');
    // url = url.concat(userId.toString());
    // url = url.concat(paymentID);
    

    // return this.httpClient.post(url, paymentID);
    
    this.modelelement=new TransactionElementModel();
    this.modelelement.userId=userId;
    this.modelelement.paymentID=paymentID;
    return this.httpClient.put(Configuration.path + 'api/Reservation/'+ this.modelelement.userId, this.modelelement);
  }

}
