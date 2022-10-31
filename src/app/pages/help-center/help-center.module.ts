import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterComponent } from './help-center.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  declarations: [
    HelpCenterComponent
  ],
  imports: [
    CommonModule,
    HelpCenterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ]
})
export class HelpCenterModule { }
