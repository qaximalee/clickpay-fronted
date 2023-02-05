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
  
  public createUserCollection(userCollection:any):Observable<any>{
    return this._http.post(this.baseUrl+`collections/`,userCollection);
  }

  public deleteUserCollection(userCollectionId:number,customerId:number):Observable<any>{
    return this._http.delete(this.baseUrl+`collections/delete?collectionId=${userCollectionId}&customerId=${customerId}`);
  }
  
}
