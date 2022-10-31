import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showCommonFooter: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if(['/home', '/login', '/creater-signup', '/forgot-password', '/reset-password', '/payment', ].indexOf(this.router.url) > -1){
          this.showCommonFooter = false;
        }else{
          this.showCommonFooter = true;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
