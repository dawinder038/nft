import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent implements OnInit {

  showCommonFooter: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
