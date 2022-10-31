import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    PartnersComponent
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    CarouselModule
  ]
})
export class PartnersModule { }
