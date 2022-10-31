import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
// import { HeaderModule } from 'src/app/@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    // HeaderModule,
    // AuthFooterModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ResetPasswordModule { }
