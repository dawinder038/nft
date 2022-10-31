import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hot-projects',
  templateUrl: './hot-projects.component.html',
  styleUrls: ['./hot-projects.component.scss']
})
export class HotProjectsComponent implements OnInit {

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
  hotProjectsOptions: OwlOptions = { loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, dots: false, margin: 10, nav: true, items: 1, stagePadding: 15 };
  constructor() { }

  ngOnInit(): void {
  }

}
