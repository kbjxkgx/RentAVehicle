import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {

  constructor(private httpClient: HttpClient) { }

  getNotifications(): Observable<any> {
    return this.httpClient.get('https://localhost:44313/api/Notification');
  }

}
