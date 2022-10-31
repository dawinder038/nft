import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupStep5Component } from './signup-step5.component';

const routes: Routes = [
  {
    path:'',
    component: SignupStep5Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupStep5RoutingModule { }
