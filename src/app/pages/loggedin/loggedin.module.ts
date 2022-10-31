import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedinRoutingModule } from './loggedin-routing.module';
import { LoggedinComponent } from './loggedin.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    LoggedinComponent
  ],
  imports: [
    CommonModule,
    LoggedinRoutingModule,
    CarouselModule
  ]
})
export class LoggedinModule { }
