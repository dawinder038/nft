import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupStep4RoutingModule } from './signup-step4-routing.module';
import { SignupStep4Component } from './signup-step4.component';
// import { HeaderModule } from '../../@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';

@NgModule({
  declarations: [
    SignupStep4Component
  ],
  imports: [
    CommonModule,
    SignupStep4RoutingModule,
    // HeaderModule,
    // AuthFooterModule
  ]
})
export class SignupStep4Module { }
