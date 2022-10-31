import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerDetailsRoutingModule } from './partner-details-routing.module';
import { PartnerDetailsComponent } from './partner-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    PartnerDetailsComponent
  ],
  imports: [
    CommonModule,
    PartnerDetailsRoutingModule,
    CarouselModule
  ]
})
export class PartnerDetailsModule { }
