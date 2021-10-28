import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountserviceService } from './accountservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountserviceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // logs user out if they are not authenticated
    if (this.accountService.getSecureToken("AccountId") != null) {
      return true;
    } else {
      this.accountService.logout();
      console.log("You had been logout, You are not authorized to access the page");
      this.router.navigateByUrl('/');
    }
  }
}
