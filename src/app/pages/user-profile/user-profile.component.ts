import { Component, OnInit, TemplateRef } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from '../../@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  isLoaded: boolean = false;
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      // backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public chartColors: any[] = [
    {
      backgroundColor: '#f2f2f2',
    },
  ];
  public barChartLabels: Label[] = ['0', '100k', '300', '450', '500'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{ data: [0, 100, 300, 450, 500] }];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  userDetail: any = {};
  baseImgUrl: string = this.httpService.originalImgUrl;
  newProfilePicUrl: string = '';
  newCoverImgUrl: string = '';
  userId: any;
  reportType: any = 1;
  reportMessage: any = '';
  submitted: boolean = false;
  ownedNfts: any = [];
  nftItems: any = [];
  constructor(
    private httpService: GenericHttpService,
    private cs: CommonService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((perm: any) => {
      console.log('userid', perm.params.id);
      this.userId = perm.params.id;
      this.getProfileDetail();
      this.getNfts();
    });
  }
  SendNFT() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);
  }
  getProfileDetail() {
    let payload = {
      user_id: this.userId,
    };
    this.httpService.getProfileDetail(payload).subscribe((res: any) => {
      this.userDetail = res;
      let logedInUser = this.cs.getParsedLocalStorageData('user');
      if (logedInUser._id === this.userDetail._id) {
        this.cs.navigate('/my-profile');
      }
      console.log(this.userDetail);
    });
  }
  changeFollow() {
    let payload = {
      user_id: this.userId,
    };
    this.httpService
      .httpRequest('post', 'user/follow', payload)
      .subscribe((res: any) => {
        console.log(res);
        this.cs.showSuccess(res.message);
      });
  }
  getNfts() {
    let payload = {
      user_id: this.userId,
    };
    this.httpService.httpRequest('get', 'items', payload).subscribe((res: any) => {
      this.nftItems = res[0].data;
    })
  }

  likeUnlike(id: any) {
    let payload = {
      nft_id: id,
    };
    this.httpService
      .httpRequest('post', 'nft/like', payload)
      .subscribe((res: any) => {
        console.log(res);
        this.cs.showSuccess(res.message, 'success');
      });
  }

  shareBYCopy(id: string) {
    // let path=location.origin +'/user-profile/'+id;
    let path = location.href;
    this.copy(path);
  }

  copy(val: string) {
    navigator.clipboard.writeText(val);
    this.cs.showSuccess('Copied to clipboard.', '');
  }
  sharemailUrl(id: string) {
    let url = location.href;
    window.open(
      'mailto:?subject=' +
      encodeURIComponent(document.title) +
      '&body=' +
      encodeURIComponent(url)
    );
  }
  shareinstaUrl(id: string) {
    let url = location.href;
    window.open(
      'https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' +
      encodeURIComponent(document.title) +
      ':%20 ' +
      encodeURIComponent(url + 'add custom text here')
    );
  }
  sharefacebookUrl(id: string) {
    let url = location.href;
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
    );
  }
  submitReport(closeModalButton: any) {
    if (!this.reportMessage) {
      this.submitted = true;
      return;
    }
    let payload = {
      user_id: this.userId,
      message: this.reportMessage,
      type: this.reportType,
    };
    this.httpService
      .httpRequest('post', 'user/report', payload)
      .subscribe((res: any) => {
        closeModalButton.click();
        console.log(res);
        this.cs.showSuccess(res.message, 'Success');
        this.reportType = 1;
        this.reportMessage = '';
      });
  }
  makePrivate(id: any, isPrivate: any, isGifted = false) {
    let payload = {
      is_gifted: isGifted,
      nft_id: id,
      is_private: !isPrivate
    }
    this.httpService.httpRequest('put', 'nft/make-private', payload).subscribe((res: any) => {
      console.log(res);
      this.cs.showSuccess(res.message, 'Success');
    })
  }
}
