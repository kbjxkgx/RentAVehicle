import { Injectable } from '@angular/core';
import { BranchModel } from '../../models/BranchModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient: HttpClient) { }

  addBranch(branch: BranchModel): Observable<any> {
    return this.httpClient.post(Configuration.path + 'api/Branch', branch);
  }

  updateBranch(branch: BranchModel): Observable<any> {
    return this.httpClient.put(Configuration.path + 'api/Branch/' + branch.Id , branch);
  }

  getBranches() {
    return this.httpClient.get(Configuration.path + 'api/Branch');
  }

  getBranchesOfService(serviceId: number) {
    return this.httpClient.get(Configuration.path + 'api/Branches/BranchesOfService/' + serviceId);
  }

  uploadIdPhoto(fileToUpload: File, Id: string): Observable<any> {
    let _formData = new FormData();
    _formData.append('Id', Id);
    _formData.append('MyFile', fileToUpload);
    return this.httpClient.post(Configuration.path + 'api/Branch/UploadImage', _formData);
  }

  delete(branch: BranchModel) {
    return this.httpClient.delete(Configuration.path + 'api/Branch/' + branch.Id );
  }
}
