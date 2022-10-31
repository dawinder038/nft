import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from '../../@core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cs :CommonService) {
  }

  canActivate() {
    let userSession = localStorage.getItem('user-session');
    if (userSession) {
      return true;
    } else {
      this.cs.showError('Please Login To Continue','Error')
      this.cs.navigate('/login');
      return false;
    }
  }
}
