import { Injectable } from '@angular/core';
import { DataHolderConstants } from './../constants/dataHolder.constants';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public constantDataHolder : DataHolderConstants = new DataHolderConstants();

  constructor() { }

  removeFromCache(key: string){
    window.localStorage.removeItem(key);
  }

  getDataFromCache(key: string): string{
    let val = window.localStorage.getItem(key);
    return val != null ? val : "";
  }

  saveInCache(key: string, value: string){
    window.localStorage.setItem(key, value);
  }

  clearCache(){
    window.localStorage.clear();
  }

  cacheLoginData(data: any){
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.USER, JSON.stringify(data.user));
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.ROLE, JSON.stringify(data?.user.role));
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.TOKEN, data.token);
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.EXPIRY_TIME, data.expiryTime);
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.USER_ID, data.user.id);
    this.saveInCache(this.constantDataHolder.CACHE_KEYS.USER_TYPE, data.user.userType);
  }
}
