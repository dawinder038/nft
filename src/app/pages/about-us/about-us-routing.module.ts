import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUSComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: "", component: AboutUSComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
