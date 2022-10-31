import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegateUserLoggedInGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userSession = localStorage.getItem('user-session');
      if (!userSession) {
        return true;
      } else {
        this.router.navigate(['/home']);
        // this.cs.showError('Please Login To Continue','Error')
        // this.cs.navigate('/login');
        return false;
      }
  }

}
