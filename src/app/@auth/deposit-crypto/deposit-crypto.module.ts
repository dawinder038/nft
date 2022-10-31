import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositCryptoRoutingModule } from './deposit-crypto-routing.module';
import { DepositCryptoComponent } from './deposit-crypto.component';


@NgModule({
  declarations: [
    DepositCryptoComponent
  ],
  imports: [
    CommonModule,
    DepositCryptoRoutingModule
  ]
})
export class DepositCryptoModule { }
