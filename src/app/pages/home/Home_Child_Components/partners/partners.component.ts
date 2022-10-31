import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  partnersList: any = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 4,
    stagePadding: 15,
    responsive: {
      0: {
        items: 1,
      },
      480: {
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
  imgUrl: string = '';
  constructor(private httpService: GenericHttpService) {
    this.imgUrl = this.httpService.originalImgUrl;
  }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners() {
    let payload = {
      page: 1,
      limit: 10
    }
    this.httpService.httpRequest('get', 'partners', payload).subscribe((res: any) => {
      debugger
      this.partnersList = res.partners;
    });
  }
}
