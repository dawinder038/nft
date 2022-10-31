import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() profileDetail: any;
  isAcitivityView: boolean = false;
  activities: any[] = [];
  activityLabel: String = "";
  activityOptions: OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, dots: false, margin: 10, nav: true, items: 3, stagePadding: 15,
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
  };
  constructor(private httpService: GenericHttpService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.isAcitivityView = true;
    let payload = {
      user_id: this.profileDetail._id,
      page: 1,
      limit: 10
    }
    this.httpService.httpRequest('get', 'activities', payload).subscribe((response: any) => {
      this.activities = response.activities;
      if(this.activities.length == 0) {
        this.activityLabel = 'No Activity is Available';
        this.isAcitivityView = false;
      } else {
        this.isAcitivityView = false;
      }
    })
  }
}
