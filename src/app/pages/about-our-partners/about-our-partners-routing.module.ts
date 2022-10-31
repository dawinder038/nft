import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutOurPartnersComponent } from './about-our-partners.component';

const routes: Routes = [
  {
    path: "",
    component: AboutOurPartnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutOurPartnersRoutingModule { }
