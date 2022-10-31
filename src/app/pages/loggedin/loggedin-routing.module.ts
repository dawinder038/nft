import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedinComponent } from './loggedin.component';

const routes: Routes = [
  {
    path:'',
    component: LoggedinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedinRoutingModule { }
