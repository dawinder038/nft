import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftOwnedSuccessComponent } from './nft-owned-success.component';

const routes: Routes = [
  {
    path:'',
    component: NftOwnedSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NftOwnedSuccessRoutingModule { }
