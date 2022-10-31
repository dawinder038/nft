import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderModule } from '../common-components/header/header.module';
import { FooterModule } from '../common-components/footers/footer/footer.module';
import { CompleteFooterModule } from '../common-components/footers/complete-footer/complete-footer.module';
import { AuthFooterModule } from '../common-components/footers/auth-footer/auth-footer.module';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderModule,
    FooterModule,
    // CompleteFooterModule,
    AuthFooterModule
  ]
})
export class LayoutModule { }
