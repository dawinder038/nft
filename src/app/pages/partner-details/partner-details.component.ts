import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss']
})
export class PartnerDetailsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    center: true,
    margin: 10,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      1440: {
        items: 6
      }
    },
    nav: true
  }


  ngOnInit(): void {
  }

}
