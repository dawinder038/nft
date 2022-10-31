import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestFeatureComponent } from './suggest-feature/suggest-feature.component';

const routes: Routes = [
  { path: "", component: SuggestFeatureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestAFeatureRoutingModule { }
