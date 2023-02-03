import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficerManagementService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }

  public getAllRecoveryOfficerByPagination(requestBody: any):Observable<any>{
    return this._http.post(this.baseUrl+`recovery-officer/officer/getAll`, requestBody);
  }

  public createRecoveryOfficer(officer:any):Observable<any>{
    return this._http.post(this.baseUrl+`recovery-officer/officer`,officer)
  }

  
}