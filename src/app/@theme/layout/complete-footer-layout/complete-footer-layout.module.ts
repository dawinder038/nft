import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteFooterLayoutRoutingModule } from './complete-footer-layout-routing.module';
import { CompleteFooterLayoutComponent } from './complete-footer-layout.component';
import { HeaderModule } from '../../common-components/header/header.module';
import { CompleteFooterModule } from '../../common-components/footers/complete-footer/complete-footer.module';
import { CompleteFooterComponent } from '../../common-components/footers/complete-footer/complete-footer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompleteFooterLayoutComponent,
    CompleteFooterComponent

  ],
  imports: [
    CommonModule,
    CompleteFooterLayoutRoutingModule,
    HeaderModule,
    FormsModule
    // CompleteFooterModule
  ]
})
export class CompleteFooterLayoutModule { }
