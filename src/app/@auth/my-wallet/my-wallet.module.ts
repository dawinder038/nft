import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWalletRoutingModule } from './my-wallet-routing.module';
import { MyWalletComponent } from './my-wallet.component';
// import { HeaderModule } from 'src/app/@theme/header/header.module';


@NgModule({
  declarations: [
    MyWalletComponent
  ],
  imports: [
    CommonModule,
    MyWalletRoutingModule,
    // HeaderModule
  ]
})
export class MyWalletModule { }
