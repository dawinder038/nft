import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreaterSignupRoutingModule } from './creater-signup-routing.module';
import { CreaterSignupComponent } from './creater-signup.component';
// import { HeaderModule } from 'src/app/@theme/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';
import { DirectivesModule } from 'src/app/@core/directives/directives.module';


@NgModule({
  declarations: [
    CreaterSignupComponent
  ],
  imports: [
    CommonModule,
    CreaterSignupRoutingModule,
    // HeaderModule,
    // AuthFooterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class CreaterSignupModule { }
