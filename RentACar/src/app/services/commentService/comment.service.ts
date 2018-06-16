import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentModel } from '../../models/CommentModel';
import { Configuration } from '../../Constants/constants';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  addComment(comment: any): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Comment', comment);
      // .map(this.parseData)
      // .catch(this.handleError);
  }
}
