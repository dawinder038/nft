import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
// import { HeaderModule } from '../../@theme/header/header.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    // HeaderModule,
    NgxSliderModule,
    ReactiveFormsModule,
    ImageCropperModule,
    FormsModule
  ]
})
export class EditProfileModule { }
