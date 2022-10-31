import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MyProfileModule { }
