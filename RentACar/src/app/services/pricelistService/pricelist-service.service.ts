import { Injectable } from '@angular/core';
import { PricelistModel } from '../../models/PricelistModel';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private httpClient: HttpClient) { }

  addPricelist(pricelist: PricelistModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Pricelist', pricelist);
  }
}
