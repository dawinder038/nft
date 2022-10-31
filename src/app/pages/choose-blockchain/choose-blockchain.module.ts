import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseBlockchainRoutingModule } from './choose-blockchain-routing.module';
import { ChooseBlockchainComponent } from './choose-blockchain.component';


@NgModule({
  declarations: [
    ChooseBlockchainComponent
  ],
  imports: [
    CommonModule,
    ChooseBlockchainRoutingModule
  ]
})
export class ChooseBlockchainModule { }
