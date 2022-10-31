import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecomeAPartnerComponent } from './become-a-partner.component';

const routes: Routes = [
  {
    path: "",
    component: BecomeAPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeAPartnerRoutingModule { }
