import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }

  public getAllUserByPagination():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/user-details`);
  }

  public createUser(user:any):Observable<any>{
    return this._http.post(this.baseUrl+`user-profile/user-details`,user)
  }
}
