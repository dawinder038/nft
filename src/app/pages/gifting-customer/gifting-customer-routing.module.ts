import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftingCustomerComponent } from './gifting-customer.component';

const routes: Routes = [
  {
    path: "",
    component: GiftingCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftingCustomerRoutingModule { }
