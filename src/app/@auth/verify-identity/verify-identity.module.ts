import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyIdentityRoutingModule } from './verify-identity-routing.module';
import { VerifyIdentityComponent } from './verify-identity.component';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
// import { HeaderModule } from '../../@theme/header/header.module';


@NgModule({
  declarations: [
    VerifyIdentityComponent
  ],
  imports: [
    CommonModule,
    VerifyIdentityRoutingModule,
    FormsModule,
    NgxDropzoneModule
    // HeaderModule
  ]
})
export class VerifyIdentityModule { }
