import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionDetailsComponent } from './collection-details.component';
// import {LoaderComponent} from '../../loader/loader.component'

const routes: Routes = [
  {
    path: '',
    component: CollectionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionDetailsRoutingModule { }
