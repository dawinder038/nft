import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit {
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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  images = [
    {
      id: "1",
      text: "",
      image: "../../../assets/images/HomePage/partner_one.svg"
    },
    {
      id: "2",
      text: "",
      image: "../../../assets/images/HomePage/partner_two.svg"
    },
    {
      id: "3",
      text: "",
      image: "../../../assets/images/HomePage/partner_three.svg"
    },
    {
      id: "4",
      text: "",
      image: "../../../assets/images/HomePage/partner_four.svg"
    },
    {
      id: "5",
      text: "",
      image: "../../../assets/images/HomePage/partner_one.svg"
    }
  ]

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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  hotProjectsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    nav: true,
    items: 1,
    stagePadding: 15,
  }


  activityOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    nav: true,
    items: 3,
    stagePadding: 15,
  }

  featuredNewsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    nav: true,
    items: 1,
    stagePadding: 15,
  }


  newsCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    nav: true,
    items: 1,
    stagePadding: 15,
  }
  constructor() { }

  ngOnInit(): void {
  }

}
