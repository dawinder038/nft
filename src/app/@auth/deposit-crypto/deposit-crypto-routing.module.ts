import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositCryptoComponent } from './deposit-crypto.component';

const routes: Routes = [
  {
    path: '',
    component: DepositCryptoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositCryptoRoutingModule { }
