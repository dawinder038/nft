import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUSComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AboutUSComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
