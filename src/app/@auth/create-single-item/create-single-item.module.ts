import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSingleItemRoutingModule } from './create-single-item-routing.module';
import { CreateSingleItemComponent } from './create-single-item.component';
// import { HeaderModule } from '../../@theme/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    CreateSingleItemComponent
  ],
  imports: [
    CommonModule,
    CreateSingleItemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
    // HeaderModule
  ]
})
export class CreateSingleItemModule { }
