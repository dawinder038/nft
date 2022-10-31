import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
// import { HeaderModule } from '../../@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    // HeaderModule,
    // AuthFooterModule
  ]
})
export class PaymentModule { }
