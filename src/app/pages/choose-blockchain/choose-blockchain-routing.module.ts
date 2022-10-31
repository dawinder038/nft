import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseBlockchainComponent } from './choose-blockchain.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseBlockchainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseBlockchainRoutingModule { }
