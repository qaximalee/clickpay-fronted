import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _cacheService : CacheService,
    private _router : Router,
    private _messageService : MessageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( tap(() =>{},
    (err : any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 && err.status !== 403) {
                return;
            }
            this._messageService.error('Session Expired. Unauthorized!')
            this._cacheService.clearCache();
            this._router.navigate(['']);
          }
    }))
  }
}
