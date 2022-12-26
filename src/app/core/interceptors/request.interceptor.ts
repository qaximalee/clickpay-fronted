import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private _cacheService : CacheService, private _authService : AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authService.isLoggedIn()) {
      const token = this._cacheService.getDataFromCache('token');
      request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
      });
    }        
    return next.handle(request);
  }
}
