import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSingleItemComponent } from './create-single-item.component';

const routes: Routes = [
  {
    path:'',
    component: CreateSingleItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSingleItemRoutingModule { }
