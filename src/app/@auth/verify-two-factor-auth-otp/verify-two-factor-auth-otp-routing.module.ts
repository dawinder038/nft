import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyTwoFactorAuthOtpComponent } from './verify-two-factor-auth-otp.component';

const routes: Routes = [
  {
    path:'',
    component:VerifyTwoFactorAuthOtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyTwoFactorAuthOtpRoutingModule { }
