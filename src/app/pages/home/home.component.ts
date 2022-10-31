import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from '../../@core/services/generic-http.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { delay, firstValueFrom, map, retryWhen, Subscription, tap } from 'rxjs';
import { Web3Service } from '../../@core/services/web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogedIn: boolean = false;
  profileDetail: any = {};
  subscription: any;
  subscriptions: Array<Subscription> = [];
  accountNumber: any = '';
  bnbValue: any = 0;
  balance: any = 0;
  ERC721Contract: any;
  lazyNft721Contract: any;
  ERC1155Contract: any;
  lazyNft1155Contract: any;
  
  imgUrl: string = '';
  testArr: any = [];
  isBuying: boolean = false;
  hotProjects: any[] = [];
  newsFeeds: any[] = [];
 
 
  constructor(private httpService: GenericHttpService, private cd: ChangeDetectorRef, private cs: CommonService, private web3Service: Web3Service, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('user-session')) {
      this.isLogedIn = true;
      this.profileDetail = this.cs.getParsedLocalStorageData('user');
    
      this.getUserDetails();
      const walletBalanceSubscription =
        this.web3Service.walletBallance.subscribe((res) => {
          this.balance = res;
        });
      this.subscriptions.push(walletBalanceSubscription);
      const accountNumberSubscription =
        this.web3Service.walletaddress.subscribe((res) => {
          this.accountNumber = res;
        });
      this.subscriptions.push(accountNumberSubscription);
      const bnbValueSubscription = this.web3Service.BNB_VALUE.subscribe(
        (res: any) => {
          this.bnbValue = res;
        }
      );
      this.subscriptions.push(bnbValueSubscription);
      this.ERC721Contract = this.web3Service.ERC721Contract;
      this.lazyNft721Contract = this.web3Service.lazyNft721Contract;
    }
    this.subscription = this.cs.loggedIn.subscribe((res) => {
      if (res) {
        this.getUserDetails();
      } else {
        this.isLogedIn = false;
      }
    });
    this.subscriptions.push(this.subscription);

    const accountNumberSubscription = this.web3Service.walletaddress.subscribe((res) => {
      this.accountNumber = res;
    });
    this.subscriptions.push(accountNumberSubscription);
  }
  getUserDetails() {
    this.httpService.getProfileDetail().subscribe((res: any) => {
      this.profileDetail = res;
      this.cs.setStrLocalStorage('user', res);
    });
  }
 

  /** ======= Get News Feed NFTs =========== */

  getNewsFeeds() {
    this.httpService.httpRequest('', '').subscribe((res: any) => {
      this.newsFeeds = res.data;
    });
  }
 
  /** ======= Get Hot Projects =========== */

  getHotProjects() {
    this.httpService.httpRequest('get', 'hot_projects').subscribe((response: any) => {
      this.hotProjects = response.data;
    })
  }

  
}
