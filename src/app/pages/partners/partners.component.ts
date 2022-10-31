import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  isLoaded: boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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
      575: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
  userId: any;
  partnerDetail: any;
  reportType: any = 1;
  submitted: boolean = false;
  reportMessage: any = '';
  baseImgUrl: string = this.httpService.originalImgUrl;

  constructor(
    private httpService: GenericHttpService,
    private cs: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((perm: any) => {
      console.log('userid', perm.params.id);
      this.userId = perm.params.id;
      this.getPartnerDetail();
    });
  }

  getPartnerDetail() {
    let payload = {
      user_id: this.userId,
    };
    this.httpService.httpRequest('get','user/other-user-profile',payload).subscribe((res: any) => {
      this.partnerDetail = res;
      let logedInUser = this.cs.getParsedLocalStorageData('user');
      if (logedInUser._id === this.partnerDetail._id) {
        this.cs.navigate('/profile');
      }
      console.log(this.partnerDetail);
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
}
