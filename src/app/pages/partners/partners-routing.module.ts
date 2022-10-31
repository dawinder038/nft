import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './partners.component';

const routes: Routes = [
  {
    path: "",
    component: PartnersComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: []
})
export class PartnersRoutingModule { }
