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
  }

  editComment(comment: any): Observable<any> {
    return this.httpClient.put(Configuration.path + 'api/Comment/' + comment.Id, comment);
  }

  delete(commentId: number) {
    return this.httpClient.delete(Configuration.path + 'api/Comment/' + commentId);
  }

}
