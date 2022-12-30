import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreationService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }

  public getCityList():Observable<any>{
    return this._http.get(this.baseUrl+`area/city`);
  }

  public getLocalityList():Observable<any>{
    return this._http.get(this.baseUrl+`area/locality`);
  }

  public getSubLocalityList():Observable<any>{
    return this._http.get(this.baseUrl+`area/sub-locality`);
  }
}
