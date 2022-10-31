import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@gaurds/@auth-guard/auth.guard';
import { BasicComponent } from './basic.component';

const routes: Routes = [
  {
    path:'',
    component:BasicComponent,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../../../pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'loggedin',
        loadChildren: () => import('../../../pages/loggedin/loggedin.module').then(m => m.LoggedinModule)
      },
      {
        path: 'marketplace',
        loadChildren: () => import('../../../pages/marketplace/marketplace.module').then(m => m.MarketplaceModule)
      },
      {
        path: 'create-item',
        loadChildren: () => import('../../../pages/create-item/create-item.module').then(m => m.CreateItemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../../pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'nft-details/:id',
        loadChildren: () => import('../../../pages/nft-detail/nft-detail.module').then(m => m.NftDetailModule)
      },
      {
        path: 'newsfeed',
        loadChildren: () => import('../../../pages/newsfeed/newsfeed.module').then(m => m.NewsfeedModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('../../../pages/my-profile/my-profile.module').then(m => m.MyProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'partners/:id',
        loadChildren: () => import('../../../pages/partners/partners.module').then(m => m.PartnersModule)
      },
      {
        path: 'gifting-customer',
        loadChildren: () => import('../../../pages/gifting-customer/gifting-customer.module').then(m => m.GiftingCustomerModule)
      },
      {
        path: 'create-project',
        loadChildren: () => import('../../../pages/create-project/create-project.module').then(m => m.CreateProjectModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../../../pages/faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: 'help-center',
        loadChildren: () => import('../../../pages/help-center/help-center.module').then(m => m.HelpCenterModule)
      },
      {
        path: 'become-a-partner',
        loadChildren: () => import('../../../pages/become-a-partner/become-a-partner.module').then(m => m.BecomeAPartnerModule)
      },
      {
        path: 'about-our-partners',
        loadChildren: () => import('../../../pages/about-our-partners/about-our-partners.module').then(m => m.AboutOurPartnersModule)
      },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
