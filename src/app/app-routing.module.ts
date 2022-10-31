import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./@theme/layout/basic/basic.module').then(m => m.BasicModule),
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./@theme/layout/complete-footer-layout/complete-footer-layout.module').then(m => m.CompleteFooterLayoutModule
  //     ),
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./@theme/layout/small-footer/small-footer.module').then(m => m.SmallFooterModule
  //     ),
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./@theme/layout/auth-footer-layout/auth-footer-layout.module').then(m => m.AuthFooterLayoutModule
  //     ),
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./@theme/layout/blank/blank.module').then(m => m.BlankModule),
  // },


  {
    path: '',
    loadChildren: () => import('./@theme/layout/layout.module').then(m => m.LayoutModule),
  },

  // {
  //   path: 'login',
  //   loadChildren: () => import('./@auth/login/login.module').then(m => m.LoginModule)
  // },

  // {
  //   path: 'signup',
  //   loadChildren: () => import('./@auth/sign-up/sign-up.module').then(m => m.SignUpModule)
  // },
  // {
  //   path: 'creater-signup',
  //   loadChildren: () => import('./@auth/creater-signup/creater-signup.module').then(m => m.CreaterSignupModule)
  // },
  // {
  //   path: 'personal-details',
  //   loadChildren: () => import('./@auth/personal-details/personal-details.module').then(m => m.PersonalDetailsModule)
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./@auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  // },
  // {
  //   path: 'reset-password',
  //   loadChildren: () => import('./@auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  // },
  // {
  //   path: 'payment',
  //   loadChildren: () => import('./@auth/payment/payment.module').then(m => m.PaymentModule)
  // },
  // {
  //   path: 'signup-4',
  //   loadChildren: () => import('./@auth/signup-step4/signup-step4.module').then(m => m.SignupStep4Module)
  // },
  // {
  //   path: 'signup-5',
  //   loadChildren: () => import('./@auth/signup-step5/signup-step5.module').then(m => m.SignupStep5Module)
  // },

  // // {
  // //   path: '/signup',
  // //   loadChildren: () => import('./@auth/signup/signup.module').then(m => m.SignupModule)
  // // }
  // {
  //   path: 'create-single-item',
  //   loadChildren: () => import('./@auth/create-single-item/create-single-item.module').then(m => m.CreateSingleItemModule)
  // },
  // {
  //   path: 'create-collectible-item',
  //   loadChildren: () => import('./@auth/create-collectible-item/create-collectible-item.module').then(m => m.CreateCollectibleItemModule)
  // },
  // {
  //   path: 'verify-identity',
  //   loadChildren: () => import('./@auth/verify-identity/verify-identity.module').then(m => m.VerifyIdentityModule)
  // },
  // {
  //   path: 'payment-method',
  //   loadChildren: () => import('./@auth/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
  // },
  // {
  //   path: 'nft-owned-success',
  //   loadChildren: () => import('./@auth/nft-owned-success/nft-owned-success.module').then(m => m.NftOwnedSuccessModule)
  // },
  // {
  //   path: 'edit-profile',
  //   loadChildren: () => import('./@auth/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
  // },
  // {
  //   path: 'my-wallet',
  //   loadChildren: () => import('./@auth/my-wallet/my-wallet.module').then(m => m.MyWalletModule)
  // },
  // {
  //   path: 'deposit-crypto',
  //   loadChildren: () => import('./@auth/deposit-crypto/deposit-crypto.module').then(m => m.DepositCryptoModule)
  // },
  // {
  //   path: 'withdraw-crypto',
  //   loadChildren: () => import('./@auth/withdraw-crypto/withdraw-crypto.module').then(m => m.WithdrawCryptoModule)
  // },
  {
    path: 'partners',
    loadChildren: () => import('./pages/partners/partners.module').then(m => m.PartnersModule)
  },
  {
    path: 'collection-details/:id',
    loadChildren: () => import('./pages/collection-details/collection-details.module').then(m => m.CollectionDetailsModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'suggest-a-feature',
    loadChildren: () => import('./pages/suggest-afeature/suggest-afeature.module').then(m => m.SuggestAFeatureModule)
  },
  {
    path: 'privacy-and-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-aand-conditions/terms-aand-conditions.module').then(m => m.TermsAandConditionsModule)
  },
  {
    path: 'activities', 
    loadChildren: () => import('./pages/activities/activities.module').then(m=>m.ActivitiesModule)
  },
  {
    path: 'about-us', 
    loadChildren: () => import('./pages/about-us/about-us.module').then(m=>m.AboutUsModule)
  },
  {
    path: "****",
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
