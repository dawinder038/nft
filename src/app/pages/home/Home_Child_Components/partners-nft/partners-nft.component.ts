import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-partners-nft',
  templateUrl: './partners-nft.component.html',
  styleUrls: ['./partners-nft.component.scss']
})
export class PartnersNftComponent implements OnInit {

  partnersOptions: OwlOptions = {
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
  constructor() { }

  ngOnInit(): void {
  }

}
