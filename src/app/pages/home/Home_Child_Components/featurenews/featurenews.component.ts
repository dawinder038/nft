import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-featurenews',
  templateUrl: './featurenews.component.html',
  styleUrls: ['./featurenews.component.scss']
})
export class FeaturenewsComponent implements OnInit {
  featuredNews: any = [];
  imgUrl: string = '';
  featuredNewsOptions: OwlOptions = { loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, dots: false, margin: 10, nav: true, items: 1, stagePadding: 15 };
  newsCustomOptions: OwlOptions = { loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, dots: false, margin: 10, nav: true, items: 1, stagePadding: 15 };
  constructor(private httpService: GenericHttpService) {
    this.imgUrl = this.httpService.originalImgUrl;
  }

  ngOnInit(): void {
  }

  getFeaturedNews() {
    this.httpService
      .httpRequest('get', 'featured-news')
      .subscribe((res: any) => {
        let featuredNews = res.data;
        let newArray = [];
        const chunkSize = 10;
        for (let i = 0; i < featuredNews.length; i += chunkSize) {
          let chunk = featuredNews.slice(i, i + chunkSize);
          if (chunk.length > 0) {
            newArray.push(chunk);
          }
        }
        this.featuredNews = newArray;
      });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
