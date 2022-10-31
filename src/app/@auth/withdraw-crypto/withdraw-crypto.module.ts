import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawCryptoRoutingModule } from './withdraw-crypto-routing.module';
import { WithdrawCryptoComponent } from './withdraw-crypto.component';


@NgModule({
  declarations: [
    WithdrawCryptoComponent
  ],
  imports: [
    CommonModule,
    WithdrawCryptoRoutingModule
  ]
})
export class WithdrawCryptoModule { }
