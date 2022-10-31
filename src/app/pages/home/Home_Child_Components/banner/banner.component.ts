import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() profileDetail: any;
  bannerOptions: OwlOptions = { loop: true, dots: true, nav: false, items: 1, autoplay: true };
  bannerImages: any = [];
  imgUrl: string = '';
  
  constructor(private httpService: GenericHttpService) {
    this.imgUrl = this.httpService.originalImgUrl;
  }

  ngOnInit(): void {
    this.getBannerImages();
  }

  getBannerImages() {
    this.httpService.httpRequest('get', 'user/home-slides').subscribe({
      next: (res: any) => {
        this.bannerImages = res.slides;
      },
    });
  }
}
