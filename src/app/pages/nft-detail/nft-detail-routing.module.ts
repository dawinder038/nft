import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftDetailComponent } from './nft-detail.component';

const routes: Routes = [
  {
    path: "",
    component: NftDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NftDetailRoutingModule { }
