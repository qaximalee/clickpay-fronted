import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.loginUrl;

  private _httpBackend : HttpClient;

  constructor(
    handler : HttpBackend,
    private _cacheService : CacheService
    ) 
  { 
    this._httpBackend = new HttpClient(handler);
  }

  public login(loginForm : any): Observable<any>{
    const headers = { 'Authorization': 'Basic Y2FsY2VydHM6dG9wc2VjcmV0' };
    return this._httpBackend.post(
     this.loginUrl+`?grant_type=${loginForm?.grant_type}&username=${loginForm?.username}&password=${loginForm?.password}`,
     null,
     { headers: headers }
    );
  }

  isLoggedIn(){
    return this._cacheService.getDataFromCache('token') && this._cacheService.getDataFromCache('isLoggedIn') ? true : false;
  }

  getLoggedInRole(){
    return JSON.parse(this._cacheService.getDataFromCache('user'))['role'];
  }

  getLoggedInUsername(){
    return JSON.parse(this._cacheService.getDataFromCache('user'))['name'];
  }

}
