import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
// import { HeaderModule } from '../../@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    // HeaderModule,
    // AuthFooterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    Ng2TelInputModule
  ]
})
export class ForgotPasswordModule { }
