import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodComponent } from './payment-method.component';


@NgModule({
  declarations: [
    PaymentMethodComponent
  ],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule
  ]
})
export class PaymentMethodModule { }
