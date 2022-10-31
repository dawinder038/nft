import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() accountNumber: any = '';
  @Input() bnbValue: any = 0;
  @Input() balance: any = 0;
  checkoutContent: any = {};
  collections: any[] = [];
  isNFTsLoader: boolean = false;
  sum: number = 0;
  marketPlaceNfts: any[] = [];
  constructor(private httpService: GenericHttpService, private cs: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getMarketPlaceNfts();
    this.getAllCategories();
    if(localStorage.getItem('user-session')) {
      this.getAllCollections();
    }
  }

  /** ======= Get All NFTs ================  */

  getMarketPlaceNfts() {
    this.isNFTsLoader = true;
    this.sum = this.sum + 4
    let payload = {
      limit: this.sum,
    }
    this.httpService.httpRequest('get', 'nfts', payload).subscribe((res: any) => {
      this.marketPlaceNfts = res[0].data;
      this.isNFTsLoader = false;
    });
  }

  /** ========= Get All Categories ================ */

  categories: any[] = [];
  getAllCategories() {
    this.httpService.httpRequest('get', 'nft/categories').subscribe((res: any) => {
      this.categories = res;
    });
  }

  /** ========= Get All Collections =============== */

  getAllCollections() {
    this.httpService.httpRequest('get', 'homepage/collections').subscribe((res: any) => {
      this.collections = res.collections;
    });
  }

  /** ========= Like and Unlike NFTs ============== */

  likeUnlike(id: any, event: Event) {
    event.stopPropagation()
    let payload = {
      nft_id: id,
    };
    this.httpService.httpRequest('post', 'nft/like', payload).subscribe((res: any) => {
      this.cs.showSuccess(res.message, 'success');
    });
  }

  /** ========== Filter NFTs ============== */

  blockArray: any[] = [
    { label: 'BNB', value: 'BNB' },
    { label: 'POLYGON', value: 'POLYGON' }
  ]

  priceSortsArray: any[] = [
    { label: 'Recently Added', value: 1 },
    { label: 'Price: Low - High', value: 2 },
    { label: 'Price: High - Low', value: 3 },
  ]
  startPrice: String = "";
  endPrice: String = "";

  filterNFTsByCollection(collection: any, event: any) {
    if (event.target.checked == true) {
      let payload = {
        collection_id: collection._id,
        limit: 4,
        page: 1
      }
      this.httpService.httpRequest('get', 'nfts', payload).subscribe((res: any) => {
        this.marketPlaceNfts = res[0].data;
        this.isNFTsLoader = false;
      }, (error: any) => {
        this.isNFTsLoader = false;
        this.marketPlaceNfts = [];
      });
    }
  }

  filterNFTsByPrice() {
    let payload = {
      start_price: this.startPrice,
      end_price: this.endPrice,
      page: 1
    }
    this.httpService.httpRequest('get', 'nfts', payload).subscribe((res: any) => {
      this.marketPlaceNfts = res[0].data;
      this.isNFTsLoader = false;
    }, (error: any) => {
      this.isNFTsLoader = false;
      this.marketPlaceNfts = [];
    });
  }

  sortNFTsByRange(rangeValue: Number) {
    let payload = {
      sort_by: rangeValue,
      page: 1
    }
    this.httpService.httpRequest('get', 'nfts', payload).subscribe((res: any) => {
      this.marketPlaceNfts = res[0].data;
      this.isNFTsLoader = false;
    }, (error: any) => {
      this.isNFTsLoader = false;
      this.marketPlaceNfts = [];
    });
  }

  /** ============== Load More NFTs ============== */

  loadMoreNFts() {
    this.sum + 4;
    this.getMarketPlaceNfts();
  }

  goLoginPage() {
    this.cs.showError("Please Login before buy NFT", "Error");
    this.router.navigateByUrl('/login');
  }

  goNftDetailPage(nftData: any) {
    if(!this.isLoggedIn) {
      this.cs.showError("Please must be login first!");
      this.router.navigateByUrl('/nft-details/' + nftData._id);
    } else {
      this.router.navigateByUrl('/nft-details/' + nftData._id);
    }
  }

  buyNft(data: any) {

  }
}
