import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private authSvc: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogin();
  }

  checkLogin(): boolean{
    let result = false;
    let username = localStorage.getItem('loginPersonel');
    if (!username)
    {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private tokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
}
