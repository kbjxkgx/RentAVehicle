import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/behaviorsubject';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  private isConfirmedSource = new BehaviorSubject<boolean>(false);
  private isUserSource = new BehaviorSubject<boolean>(false);
  private isAdminSource = new BehaviorSubject<boolean>(false);
  private isManagerSource = new BehaviorSubject<boolean>(false);
  
  isLoggedInMessage = this.isLoggedInSource.asObservable();
  isConfirmedMessage = this.isConfirmedSource.asObservable();
  isUserMessage = this.isUserSource.asObservable();
  isAdminMessage = this.isAdminSource.asObservable();
  isManagerMessage = this.isManagerSource.asObservable();


  constructor() { }

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
}
