import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-auth-footer-layout',
  templateUrl: './auth-footer-layout.component.html',
  styleUrls: ['./auth-footer-layout.component.scss'],
})
export class AuthFooterLayoutComponent implements OnInit {
  roterArray: Array<string> = [
    '/creater-signup',
    '/personal-details',
    '/signup-4',
  ];
  dynamicFotterClass = '';
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        let url=this.router.url;
        if(url.indexOf('?')>=0){
          url=url.split('?')[0]
        }
        let index = this.roterArray.indexOf(url);
        if (index > -1) {
          switch (this.roterArray[index]) {
            case this.roterArray[0]:
              this.dynamicFotterClass = 'signup';
              break;
            case this.roterArray[1]:
              this.dynamicFotterClass = 'personalDetails';
              break;
            case this.roterArray[2]:
              this.dynamicFotterClass = 'signup4';
              break;
            default:
              this.dynamicFotterClass = '';
              break;
          }
        } else {
          this.dynamicFotterClass = '';
        }
      }
    });
  }
  ngOnInit(): void {}
}
