import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawCryptoComponent } from './withdraw-crypto.component';

const routes: Routes = [
  {
    path: "",
    component: WithdrawCryptoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawCryptoRoutingModule { }
