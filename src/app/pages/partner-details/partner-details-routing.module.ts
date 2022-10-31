import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDetailsComponent } from './partner-details.component';

const routes: Routes = [
  {
    path: "",
    component: PartnerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerDetailsRoutingModule { }
