import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class CanActivateViaAuthGuard implements CanActivate {
  
  constructor(){}

  canActivate() {
    //return localStorage.role != 'Admin';
    return localStorage.getItem('role')=='Admin';
  }

}
