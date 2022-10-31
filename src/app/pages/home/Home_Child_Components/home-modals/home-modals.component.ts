import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@core/services/common.service';

@Component({
  selector: 'app-home-modals',
  templateUrl: './home-modals.component.html',
  styleUrls: ['./home-modals.component.scss']
})
export class HomeModalsComponent implements OnInit {

  checkoutContent: any = {};
  @Input() accountNumber: any = '';
  @Input() bnbValue: any = 0;
  @Input() balance: any = 0;
  copiesToBuy: any = 1;
  constructor(private cs: CommonService) { }

  ngOnInit(): void {
  }

  numberOnlyLimited(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    let p = this.copiesToBuy ? (this.copiesToBuy.toString() + event.key) : 0
    if (p > this.checkoutContent.available) {
      this.cs.showError('copies can not be greater then available', 'Success')
      return false
    }
    return true;
  }
}
