import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftDetailRoutingModule } from './nft-detail-routing.module';
import { NftDetailComponent } from './nft-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NftFilterPipe } from './NFT-Filter/nft-filter.pipe';

@NgModule({
  declarations: [
    NftDetailComponent,
    NftFilterPipe
  ],
  imports: [
    CommonModule,
    NftDetailRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NftDetailModule { }
