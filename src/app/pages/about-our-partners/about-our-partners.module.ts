import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutOurPartnersRoutingModule } from './about-our-partners-routing.module';
import { AboutOurPartnersComponent } from './about-our-partners.component';


@NgModule({
  declarations: [
    AboutOurPartnersComponent
  ],
  imports: [
    CommonModule,
    AboutOurPartnersRoutingModule
  ]
})
export class AboutOurPartnersModule { }
