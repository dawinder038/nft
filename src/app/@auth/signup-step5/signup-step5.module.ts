import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupStep5RoutingModule } from './signup-step5-routing.module';
import { SignupStep5Component } from './signup-step5.component';
// import { HeaderModule } from '../../@theme/header/header.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupStep5Component
  ],
  imports: [
    CommonModule,
    SignupStep5RoutingModule,
    // HeaderModule
    FormsModule
  ]
})
export class SignupStep5Module { }
