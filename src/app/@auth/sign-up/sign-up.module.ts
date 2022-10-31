import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
// import { HeaderModule } from 'src/app/@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    // HeaderModule,
    // AuthFooterModule
  ]
})
export class SignUpModule { }
