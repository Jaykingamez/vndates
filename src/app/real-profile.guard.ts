import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountserviceService } from './accountservice.service';

@Injectable({
  providedIn: 'root'
})
export class RealProfileGuard implements CanActivate {

  constructor(private accountService: AccountserviceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.paramMap.get("accountId");
    const permissionArray = JSON.parse(this.accountService.getSecureToken("permission"));
    // if user is viewing their own real profile
    if(this.accountService.getSecureToken("AccountId") === id){
      return true;
    }
    // if user has permission
    if (permissionArray.includes(id)) {
      return true;
    }
    else {
      this.accountService.logout();
      console.log("You had been logout, You are not authorized to access the page");
      this.router.navigateByUrl('/');
    }
  }

}
