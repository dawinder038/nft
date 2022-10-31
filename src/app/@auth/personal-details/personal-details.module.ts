import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { PersonalDetailsComponent } from './personal-details.component';
import { TranslateModule } from '@ngx-translate/core';
// import { HeaderModule } from '../../@theme/header/header.module';
// import { AuthFooterModule } from '../auth-footer/auth-footer.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PersonalDetailsComponent
  ],
  imports: [
    CommonModule,
    PersonalDetailsRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
    // HeaderModule,
    // AuthFooterModule
  ]
})
export class PersonalDetailsModule { }
