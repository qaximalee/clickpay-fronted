import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }

  // user collections 

  public getCollectionsListOfCustomer(customerId:number,pageNo:number,pageSize:number):Observable<any>{
    return this._http.get(this.baseUrl+`collections/by-customer-id?customerId=${customerId}&pageNo=${pageNo}&pageSize=${pageSize}`);
  }
  
}
