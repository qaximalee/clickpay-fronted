import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, NavigationEnd, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _messageService: MessageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._authService.isLoggedIn() && route?.data?.['roles'] == this._authService.getLoggedInRole()) {
      return true;
    }
    if(this._authService.getLoggedInRole() == Role.Admin){
      this._router.navigate(['exide']);
    }
    else if(this._authService.getLoggedInRole() == Role.Warehouse_Inspector){
      this._router.navigate(['exide/verify-warranty-card']);
    }
    this._messageService.error('You are not authorized to visit this page');
    return false;
  }
}
