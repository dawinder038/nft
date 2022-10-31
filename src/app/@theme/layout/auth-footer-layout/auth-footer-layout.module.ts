import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFooterLayoutRoutingModule } from './auth-footer-layout-routing.module';
import { AuthFooterLayoutComponent } from './auth-footer-layout.component';
import { AuthFooterModule } from '../../common-components/footers/auth-footer/auth-footer.module';
import { HeaderModule } from '../../common-components/header/header.module';


@NgModule({
  declarations: [AuthFooterLayoutComponent],
  imports: [
    CommonModule,
    AuthFooterLayoutRoutingModule,
    AuthFooterModule,
    HeaderModule
  ]
})
export class AuthFooterLayoutModule { }
