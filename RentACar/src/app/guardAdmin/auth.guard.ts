import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class CanActivateViaAdminAuthGuard implements CanActivate {
  
  constructor(){}

  canActivate() {
    return localStorage.getItem('role')=='Admin';
  }

}
