import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestAFeatureRoutingModule } from './suggest-afeature-routing.module';
import { SuggestFeatureComponent } from './suggest-feature/suggest-feature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

@NgModule({
  declarations: [
    SuggestFeatureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuggestAFeatureRoutingModule,
    Ng2TelInputModule
  ]
})
export class SuggestAFeatureModule { }
