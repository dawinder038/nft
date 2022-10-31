import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeAPartnerRoutingModule } from './become-a-partner-routing.module';
import { BecomeAPartnerComponent } from './become-a-partner.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BecomeAPartnerComponent
  ],
  imports: [
    CommonModule,
    BecomeAPartnerRoutingModule,
    ReactiveFormsModule
  ]
})
export class BecomeAPartnerModule { }
