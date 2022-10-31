import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyTwoFactorAuthOtpRoutingModule } from './verify-two-factor-auth-otp-routing.module';
import { VerifyTwoFactorAuthOtpComponent } from './verify-two-factor-auth-otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';


@NgModule({
  declarations: [VerifyTwoFactorAuthOtpComponent],
  imports: [
    CommonModule,
    VerifyTwoFactorAuthOtpRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxOtpInputModule
  ]
})
export class VerifyTwoFactorAuthOtpModule { }
