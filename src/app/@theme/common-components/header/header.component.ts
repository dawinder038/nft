import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { Web3Service } from 'src/app/@core/services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData: any;
  userDetail: any;
  subscription: Subscription = new Subscription();
  baseImgUrl: string = this.httpService.originalImgUrl;
  isLogedIn: boolean = false;
  isShow: boolean = false;
  accountNumber: any;
  balance: any;
  bnbValue: any = 0;
  subscriptions: Array<Subscription> = [];
  userType: any;
  searchText: any = '';
  searchList: any = [];
  constructor(
    public translate: TranslateService,
    private renderer: Renderer2,
    private httpService: GenericHttpService,
    private commonService: CommonService,
    private web3Service: Web3Service
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    const loginSubscription = this.commonService.loggedIn.subscribe((res) => {
      if (res) {
        this.GetProfile();
        this.isLogedIn = true;
        // this.web3Service.checkWeb3();
        // this.web3Service.walletaddress.next('')
      } else {
        this.isLogedIn = false;
      }
    });
    this.subscriptions.push(loginSubscription)

    const userProfileChangeSubscription = this.commonService.userProfileChange.subscribe((res: any) => {
      if (res) {
        this.userDetail = this.commonService.getParsedLocalStorageData('user');
      }
    });
    this.subscriptions.push(userProfileChangeSubscription)

    const bnbValueSubscription = this.web3Service.BNB_VALUE.subscribe((res: any) => {
      this.bnbValue = res;
    });
    this.subscriptions.push(bnbValueSubscription)
    const accountNumberSubscription = this.web3Service.walletaddress.subscribe((res) => {
      this.accountNumber = res;
    });
    this.subscriptions.push(accountNumberSubscription);
  }

  ngOnInit(): void {
    if (localStorage.getItem('user-session')) {
      this.isLogedIn = true;
      this.userDetail = this.commonService.getParsedLocalStorageData('user');
      this.GetProfile();
      // this.web3Service.checkWeb3();
      this.userType = this.commonService.getUserType();
    }
    const walletBalanceSubscription = this.web3Service.walletBallance.subscribe((res) => {
      this.balance = Number(res).toFixed(5);
    });
    this.subscriptions.push(walletBalanceSubscription)

  }

  switchLang(lang: string) {
    this.translate.use(lang);
    if (lang == 'ar') {
      this.renderer.addClass(document.body, 'direction');
    } else {
      this.renderer.removeClass(document.body, 'direction');
    }
  }

  GetProfile() {
    this.httpService.getProfileDetail().subscribe((res: any) => {
      this.userDetail = res;
      this.web3Service.walletBallance.next(res.balance)
      this.userType = this.userDetail.user_type
      this.accountNumber = res.wallet_address;
      this.web3Service.walletaddress.next(this.accountNumber);

    }, (error: any) => {
      debugger
      if(error.error.error_description == 'User doest not exist') {
       this.logOut();
      }
    });
  }
  logOut() {
    localStorage.clear();
    this.commonService.loggedIn.next(false);
    this.commonService.navigate('/home');
  }


  // async checkWeb3() {
  //   await this.web3Service.checkAndInstantiateWeb3().then(
  //     (checkConn: any) => {
  //       if (checkConn === 'connected') {
  //         this.web3Service.loadBlockChainData().then(
  //           (accountData: any) => {
  //             // this.web3.getAccountChanges();
  //             // this.web3.chainIdChange();
  //             this.accountNumber = accountData[0];
  //             // this.saveProfile();
  //             this.web3Service.accountNumber = accountData[0];
  //             this.web3Service.walletaddress.next(accountData[0]);
  //             console.log('Account number', accountData[0]);

  //             this.web3Service
  //               .getEtherBalance(this.accountNumber)
  //               .then((data: any) => {
  //                 this.web3Service.balance = Number(data).toFixed(2);
  //                 this.web3Service.walletBallance.next(
  //                   this.web3Service.balance
  //                 );
  //                 console.log('Account balance', this.web3Service.balance);
  //               });
  //           },
  //           (err) => {}
  //         );
  //       }
  //     },
  //     (err) => {}
  //   );
  // }
  refreshLoader: boolean = false;
  refreshFunds(event?: Event) {
    // this.web3Service.checkWeb3();
    this.refreshLoader = true
    if (event)
      event.stopPropagation();
    this.web3Service.getBNBVAlueInDollers();
    this.web3Service.getFundsValue();
    if (this.userType) {
      this.httpService.getProfileDetail().subscribe((res: any) => {
        this.userDetail = res;
        this.web3Service.walletBallance.next(res.balance)
        this.userType = this.userDetail.user_type
        this.accountNumber = res.wallet_address;
        this.web3Service.walletaddress.next(this.accountNumber);
        this.refreshLoader = false;
      });
    }
  }


  walletClick() {
    if ((!this.accountNumber)||!this.bnbValue) {
      this.refreshFunds()
    }
  }

  copy() {
    // navigator.clipboard.writeText(this.accountNumber);
    this.commonService.copy(this.accountNumber);
  }
  // get bnbValue(){
  //   return this.web3Service.BNB_VALUE
  // }
  ngOnDestroy() {
    this.subscriptions.forEach((element: Subscription) => {
      if (element) {
        element.unsubscribe();
      }
    });
  }


  openGiftCustomer() {
    // this.commonService.openCreate.next(true);
    this.commonService.openGiftCustomer = true;
    this.commonService.navigate('/profile');
  }
  getSearchItems(text: string) {
    let payload = {
      keyword: text
    }
    this.httpService.httpRequest('get', 'home-screen', payload).subscribe((res: any) => {
      this.searchList = res;
    })
  }
  search(event: any) {
    this.getSearchItems(event.target.value)
  }
}
