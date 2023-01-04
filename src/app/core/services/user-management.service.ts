import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }

  public getAllUserByPagination():Observable<any>{
    return this._http.get(this.baseUrl+`area/city`);
  }
}
