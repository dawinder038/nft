import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftingCustomerRoutingModule } from './gifting-customer-routing.module';
import { GiftingCustomerComponent } from './gifting-customer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    GiftingCustomerComponent
  ],
  imports: [
    CommonModule,
    GiftingCustomerRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ChartsModule
  ]
})
export class GiftingCustomerModule { }
