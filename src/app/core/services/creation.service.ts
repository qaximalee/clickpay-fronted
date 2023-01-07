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

  public getBoxMediaList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/box-media`)
  }
  
  public createBoxMedia(boxNumber:string,nearByLocation:string):Observable<any>{
    return this._http.post(this.baseUrl+`user-profile/box-media?boxNumber=${boxNumber}&nearbyLocation=${nearByLocation}`,null)
  }

  public updateBoxMedia(boxId:number,boxNumber:string,nearByLocation:string):Observable<any>{
    return this._http.put(this.baseUrl+`user-profile/box-media?boxMediaId=${boxId}&boxNumber=${boxNumber}&nearbyLocation=${nearByLocation}`,null)
  }

  public getBoxMediaDetails(boxMediaId:any):Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/box-media/${boxMediaId}`)
  }

  public getPackageList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/package`)
  }

  public createPackage(p:any):Observable<any>{
    return this._http.post(this.baseUrl+`user-profile/package`,p)
  }

  public getCompanyList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/company`)
  }

  public createCompany(name:string):Observable<any>{
    return this._http.post(this.baseUrl+`user-profile/company?name=${name}`,null)
  }

  public updateCompany(companyId:number,companyName:string):Observable<any>{
    return this._http.put(this.baseUrl+`user-profile/company?id=${companyId}&name=${companyName}`,null)
  }

  public getCompanyDetails(companyId:any):Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/company/${companyId}`)
  } 
  
  public createCity(name:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/city?cityName=${name}`,null)
  }

  public createLocality(cityId: number, name:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/locality?cityId=${cityId}&localityName=${name}`,null)
  }

  public createSubLocality(localityId: number, subLocalityName:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/sub-locality?localityId=${localityId}&subLocalityName=${subLocalityName}`,null)
  }

  public getConnectionTypeList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/connection-type`)
  }
}
