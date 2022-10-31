import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidRoutingModule } from './bid-routing.module';
import { BidComponent } from './bid.component';


@NgModule({
  declarations: [
    BidComponent
  ],
  imports: [
    CommonModule,
    BidRoutingModule
  ]
})
export class BidModule { }
