import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Configuration } from '../../Constants/constants';
import { VehicleModel } from '../../models/vehicleModel';
import { AppUserModel } from '../../models/appUserModel';

@Injectable()
export class CommunicationService {

  public vehicle: VehicleModel;
  userUpdate: AppUserModel;

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  private isConfirmedSource = new BehaviorSubject<boolean>(false);
  private isUserSource = new BehaviorSubject<boolean>(false);
  private isAdminSource = new BehaviorSubject<boolean>(false);
  private isManagerSource = new BehaviorSubject<boolean>(false);
  public AppUserIdSource = new BehaviorSubject<number>(0);
  public UsernameSource = new BehaviorSubject<string>('');
  public VehicleForUpdate = new BehaviorSubject<VehicleModel>(this.vehicle);
  public UserForUpdate = new BehaviorSubject<AppUserModel>(this.userUpdate);

  isLoggedInMessage = this.isLoggedInSource.asObservable();
  isConfirmedMessage = this.isConfirmedSource.asObservable();
  isUserMessage = this.isUserSource.asObservable();
  isAdminMessage = this.isAdminSource.asObservable();
  isManagerMessage = this.isManagerSource.asObservable();
  AppUserIdMessage = this.AppUserIdSource.asObservable();
  UsernameMessage = this.UsernameSource.asObservable();
  VehicleForUpdateMessage = this.VehicleForUpdate.asObservable();
  UserForUpdateMessage = this.UserForUpdate.asObservable();

  // for service-page
  public service: any;
  public user: any;
  
  constructor() {
   }

   changeIsLoggedIn(message: boolean)
  {
    this.isLoggedInSource.next(message);
  }
  
  changeUserForUpdate(message: AppUserModel)
  {
    this.UserForUpdate.next(message);
  }

  changeVehicleForUpdate(message: VehicleModel)
  {
    this.VehicleForUpdate.next(message);
  }

  changeIsConfirmed(message: boolean)
  {
    this.isConfirmedSource.next(message);
  }
  
  changeIsUser(message: boolean)
  {
    this.isUserSource.next(message);
  }

  changeIsAdmin(message: boolean)
  {
    this.isAdminSource.next(message);
  }

  changeIsManager(message: boolean) {
    this.isManagerSource.next(message);
  }

  changeAppUserId(message: number)
  {
    this.AppUserIdSource.next(message);
  }

  changeUsername(message: string)
  {
    this.UsernameSource.next(message);
  }
}