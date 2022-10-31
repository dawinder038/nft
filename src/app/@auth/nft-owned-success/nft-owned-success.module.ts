import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftOwnedSuccessRoutingModule } from './nft-owned-success-routing.module';
import { NftOwnedSuccessComponent } from './nft-owned-success.component';


@NgModule({
  declarations: [
    NftOwnedSuccessComponent
  ],
  imports: [
    CommonModule,
    NftOwnedSuccessRoutingModule
  ]
})
export class NftOwnedSuccessModule { }
