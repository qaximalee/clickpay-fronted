import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl = environment.baseUrl;

  constructor(private _http : HttpClient) { }
  
  // users (customers)

  public getAllUserByPagination():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/user-details`);
  }

  public getCustomersList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/user-details`)
  }

  public createUser(user:any):Observable<any>{
    return this._http.post(this.baseUrl+`user-profile/user-details`,user)
  }

  public getCustomerByFilter(body:any){
    return this._http.post(this.baseUrl+`user-profile/customer-details/filter`,body)
  }

  private customer = new Subject<any>();
  $customer = this.customer.asObservable();

  passFilteredCustomer(selectedCustomer: any){
    this.customer.next(selectedCustomer);
  }
  
}
