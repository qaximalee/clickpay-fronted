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

  public updatePackage(p:any):Observable<any>{
    return this._http.put(this.baseUrl+`user-profile/package`,p)
  }

  public getPackageDetails(packageId:any):Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/package/${packageId}`)
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

  public deleteCompany(companyId:number):Observable<any>{
    return this._http.delete(this.baseUrl+`user-profile/company/delete?id=${companyId}`)
  }

  public getCompanyDetails(companyId:any):Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/company/${companyId}`)
  } 
  
  public createCity(name:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/city?cityName=${name}`,null)
  }

  public updateCity(cityId:number,cityName:string):Observable<any>{
    return this._http.put(this.baseUrl+`area/city?cityId=${cityId}&cityName=${cityName}`,null)
  }

  public getCityDetails(cityId:any):Observable<any>{
    return this._http.get(this.baseUrl+`area/city/${cityId}`)
  }

  public createLocality(cityId: number, name:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/locality?cityId=${cityId}&localityName=${name}`,null)
  }

  public updateLocality(cityId:number,localityId:number,localityName:string):Observable<any>{
    return this._http.put(this.baseUrl+`area/locality?cityId=${cityId}&localityId=${localityId}&localityName=${localityName}`,null)
  }

  public getLocalityDetails(localityId:any):Observable<any>{
    return this._http.get(this.baseUrl+`area/locality/${localityId}`)
  }

  public createSubLocality(localityId: number, subLocalityName:string):Observable<any>{
    return this._http.post(this.baseUrl+`area/sub-locality?localityId=${localityId}&subLocalityName=${subLocalityName}`,null)
  }

  public updateSubLocality(subLocalityId:number,localityId:number,subLocalityName:string):Observable<any>{
    return this._http.put(this.baseUrl+`area/sub-locality?localityId=${localityId}&subLocalityId=${subLocalityId}&subLocalityName=${subLocalityName}`,null)
  }

  public getSubLocalityDetails(subLocalityId:any):Observable<any>{
    return this._http.get(this.baseUrl+`area/sub-locality/${subLocalityId}`)
  }

  public getConnectionTypeList():Observable<any>{
    return this._http.get(this.baseUrl+`user-profile/connection-type`)
  }
}
