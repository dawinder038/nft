import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProjectRoutingModule } from './create-project-routing.module';
import { CreateProjectComponent } from './create-project.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    CreateProjectRoutingModule,
    CarouselModule,
    FormsModule
  ]
})
export class CreateProjectModule { }
