import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorProfileRoutingModule } from './creator-profile-routing.module';
import { CreatorProfileComponent } from './creator-profile/creator-profile.component';


@NgModule({
  declarations: [
    CreatorProfileComponent
  ],
  imports: [
    CommonModule,
    CreatorProfileRoutingModule
  ]
})
export class CreatorProfileModule { }
