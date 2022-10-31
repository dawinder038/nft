import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsAandConditionsRoutingModule } from './terms-aand-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    TermsAandConditionsRoutingModule
  ]
})
export class TermsAandConditionsModule { }
