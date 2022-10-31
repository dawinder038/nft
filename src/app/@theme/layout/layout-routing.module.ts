import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      // {
      //   path: '',
      //   loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)
      // },

      {
        path: '',
        loadChildren: () => import('./complete-footer-layout/complete-footer-layout.module').then(m => m.CompleteFooterLayoutModule)
      },
      {
        path: '',
        loadChildren: () => import('./small-footer/small-footer.module').then(m => m.SmallFooterModule)
      },
      {
        path: '',
        loadChildren: () => import('./auth-footer-layout/auth-footer-layout.module').then(m => m.AuthFooterLayoutModule)
      },
      {
        path: '',
        loadChildren: () => import('./blank/blank.module').then(m => m.BlankModule)
      },

     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
