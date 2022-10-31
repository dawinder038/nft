import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmallFooterRoutingModule } from './small-footer-routing.module';
import { SmallFooterComponent } from './small-footer.component';
import { HeaderModule } from '../../common-components/header/header.module';
import { FooterModule } from '../../common-components/footers/footer/footer.module';

@NgModule({
  declarations: [SmallFooterComponent],
  imports: [CommonModule, SmallFooterRoutingModule, HeaderModule, FooterModule],
})
export class SmallFooterModule {}
