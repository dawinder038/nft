import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCollectibleItemRoutingModule } from './create-collectible-item-routing.module';
import { CreateCollectibleItemComponent } from './create-collectible-item.component';
// import { HeaderModule } from '../../@theme/header/header.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    CreateCollectibleItemComponent
  ],
  imports: [
    CommonModule,
    CreateCollectibleItemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    FormsModule
    // HeaderModule
  ]
})
export class CreateCollectibleItemModule { }
