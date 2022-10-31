import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatorProfileComponent } from './creator-profile/creator-profile.component';

const routes: Routes = [
  { path: "", component: CreatorProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorProfileRoutingModule { }
