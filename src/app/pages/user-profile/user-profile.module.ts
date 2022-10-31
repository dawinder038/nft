import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ChartsModule,
    CarouselModule,
    FormsModule
  ]
})
export class UserProfileModule { }
