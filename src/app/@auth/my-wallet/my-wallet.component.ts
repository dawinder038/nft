import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../@core/services/web3.service';
import { CommonService } from '../../@core/services/common.service';
import { Subscription } from 'rxjs';
import { profile } from 'console';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss'],
})
export class MyWalletComponent implements OnInit {
  constructor(private web3Service: Web3Service, private cs: CommonService,private httpService:GenericHttpService) {
  }
  balance: any = 0;
  accountNumber: any;
  bnbValue:any=0;
  subscriptions:Array<Subscription>=[];
  profileDetail:any={};
  baseImgUrl=this.httpService.originalImgUrl
  ngOnInit(): void {
    const walletBalanceSubscription = this.web3Service.walletBallance.subscribe((res) => {
      this.balance = res;
    });
    this.subscriptions.push(walletBalanceSubscription);
    const accountNumberSubscription=  this.web3Service.walletaddress.subscribe((res) => {
      this.accountNumber = res;
    });
    this.subscriptions.push(accountNumberSubscription);
    const bnbValueSubscription= this.web3Service.BNB_VALUE.subscribe((res: any) => {
      this.bnbValue = res;
    });
    this.subscriptions.push(bnbValueSubscription);
    this.profileDetail = this.cs.getParsedLocalStorageData('user');

  }

  copy() {
    this.cs.copy(this.accountNumber);
  }
  // get bnbValue() {
  //   return this.web3Service.BNB_VALUE;
  // }
  refreshFunds(){
    // this.web3Service.checkWeb3();
    this.web3Service.getBNBVAlueInDollers();
    this.web3Service.getFundsValue()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((element: Subscription) => {
      if (element) {
        element.unsubscribe();
      }
    });
  }
}
