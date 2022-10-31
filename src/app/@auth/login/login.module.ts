import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { HeaderModule } from '../../@theme/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    // HeaderModule,
    // AuthFooterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
