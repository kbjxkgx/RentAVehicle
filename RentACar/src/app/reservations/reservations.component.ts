import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/servicesService/services.service';
import { ReservationService } from '../services/reservationService/reservation.service';
import { ReservationModel } from '../models/ReservationModel';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { AppUserModel } from '../models/appUserModel';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
  
  payment: string;
  isVisible: boolean;
  reservations: any[];
  user: AppUserModel;
  priceToPay: number=10;

  constructor(private data: CommunicationService,
    private servicesService: ServicesService, private reservationService: ReservationService) { }

  ngOnInit() {

    this.user = this.data.user;

    this.reservationService.getReservationsOfUser(this.user.Id)
      .subscribe(
        data => {
          this.priceToPay=data.PriceToPay;
          this.reservations = data.Reservations as Array<any>;
          console.log('getReservationsOfUser succeded...');
          if(this.reservations.length!=0){
            this.initConfig();
          }
        },
        error => {
          console.log(error);
        });

    this.isVisible=true;    
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AflgPHDSLj8B5eia9arj2EpbG-1A_ndartxde44pTVu-YpyBD4Yv9EJm09dbONuzDfKLmcbWkIKplbOk'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
        this.payment=data.paymentID;
        this.reservationService.payedReservations(this.user.Id, this.payment )
        .subscribe(
          data => {
            this.isVisible=false;
          },
          error => {
            console.log(error);
          });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: this.priceToPay
        }
      }]
    });
  }


}
