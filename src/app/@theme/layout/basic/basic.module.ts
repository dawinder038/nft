import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import { HeaderModule } from '../../common-components/header/header.module';
import { CompleteFooterModule } from '../../common-components/footers/complete-footer/complete-footer.module';
import { CompleteFooterComponent } from '../../common-components/footers/complete-footer/complete-footer.component';

@NgModule({
  declarations: [
    BasicComponent,
    // CompleteFooterComponent

  ],
  imports: [
    CommonModule,
    BasicRoutingModule,
    HeaderModule,
    // CompleteFooterModule
  ]
})
export class BasicModule { }
