import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Configuration } from '../../Constants/constants';

@Injectable()
export class CommunicationService {

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  private isConfirmedSource = new BehaviorSubject<boolean>(false);
  private isUserSource = new BehaviorSubject<boolean>(false);
  private isAdminSource = new BehaviorSubject<boolean>(false);
  private isManagerSource = new BehaviorSubject<boolean>(false);
  private AppUserIdSource = new BehaviorSubject<number>(0);
  private UsernameSource = new BehaviorSubject<string>('');

  isLoggedInMessage = this.isLoggedInSource.asObservable();
  isConfirmedMessage = this.isConfirmedSource.asObservable();
  isUserMessage = this.isUserSource.asObservable();
  isAdminMessage = this.isAdminSource.asObservable();
  isManagerMessage = this.isManagerSource.asObservable();
  AppUserIdMessage = this.AppUserIdSource.asObservable();
  UsernameMessage = this.UsernameSource.asObservable();


  constructor() {
   }

   changeIsLoggedIn(message: boolean)
  {
    this.isLoggedInSource.next(message);
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
  
  changeIsManager(message: boolean)
  {
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