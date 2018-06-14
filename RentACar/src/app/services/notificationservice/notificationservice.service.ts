import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
import { NotificationModel } from '../../models/notificationModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {

  constructor(private httpClient: HttpClient) { }

  getNotifications(): Observable<any> {
    return this.httpClient.get(Configuration.path + '/api/Notification/UnseenNotifications');
  }

  notificationSeen(notification: NotificationModel) {
    let url = '';
    url = url.concat(Configuration.path + 'api/Notification/');
    url = url.concat(notification.Id.toString());
    
    return this.httpClient.put(url, notification);
  }

}
