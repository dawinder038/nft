import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupStep4Component } from './signup-step4.component';

const routes: Routes = [
  {
    path:'',
    component: SignupStep4Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupStep4RoutingModule { }
