import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerificationRoutingModule } from './otp-verification-routing.module';
import { OtpVerificationComponent } from './otp-verification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';


@NgModule({
  declarations: [
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    OtpVerificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxOtpInputModule
  ]
})
export class OtpVerificationModule { }
