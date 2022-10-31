import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NegateUserLoggedInGuard } from 'src/app/@gaurds/negate-user-logged-in.guard';
import { AuthFooterLayoutComponent } from './auth-footer-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthFooterLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../../../@auth/login/login.module').then(m => m.LoginModule),
        canActivate:[NegateUserLoggedInGuard]
      },

      // {
      //   path: 'signup',
      //   loadChildren: () => import('../../../@auth/sign-up/sign-up.module').then(m => m.SignUpModule)
      // },
      {
        path: 'signup-4',
        loadChildren: () => import('../../../@auth/signup-step4/signup-step4.module').then(m => m.SignupStep4Module)
      },

      {
        path: 'creater-signup',
        loadChildren: () => import('../../../@auth/creater-signup/creater-signup.module').then(m => m.CreaterSignupModule),
        canActivate:[NegateUserLoggedInGuard]
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../../../@auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
        canActivate:[NegateUserLoggedInGuard]

      },
      {
        path: 'reset-password',
        loadChildren: () => import('../../../@auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
        canActivate:[NegateUserLoggedInGuard]
      },
      {
        path: 'personal-details',
        loadChildren: () => import('../../../@auth/personal-details/personal-details.module').then(m => m.PersonalDetailsModule)
      },

      {
        path: 'payment',
        loadChildren: () => import('../../../@auth/payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../../../@auth/verify-email/verify-email.module').then(m => m.VerifyEmailModule)
      },
      {
        path: 'verify-otp',
        loadChildren: () => import('../../../@auth/otp-verification/otp-verification.module').then(m => m.OtpVerificationModule),
        canActivate:[NegateUserLoggedInGuard]
      },
      {
        path: 'two-factor-verification',
        loadChildren: () => import('../../../@auth/verify-two-factor-auth-otp/verify-two-factor-auth-otp.module').then(m => m.VerifyTwoFactorAuthOtpModule)
      },
      // {
      //   path: 'creater-signup',
      //   loadChildren: () => import('../../../@auth/creater-signup/creater-signup.module').then(m => m.CreaterSignupModule)
      // },

      // {
      //   path: 'signup-4',
      //   loadChildren: () => import('../../../@auth/signup-step4/signup-step4.module').then(m => m.SignupStep4Module)
      // },
      // {
      //   path: 'signup-5',
      //   loadChildren: () => import('../../../@auth/signup-step5/signup-step5.module').then(m => m.SignupStep5Module)
      // },

      // // {
      // //   path: '/signup',
      // //   loadChildren: () => import('../../../@auth/signup/signup.module').then(m => m.SignupModule)
      // // }
      // {
      //   path: 'create-single-item',
      //   loadChildren: () => import('../../../@auth/create-single-item/create-single-item.module').then(m => m.CreateSingleItemModule)
      // },
      // {
      //   path: 'create-collectible-item',
      //   loadChildren: () => import('../../../@auth/create-collectible-item/create-collectible-item.module').then(m => m.CreateCollectibleItemModule)
      // },
      // {
      //   path: 'verify-identity',
      //   loadChildren: () => import('../../../@auth/verify-identity/verify-identity.module').then(m => m.VerifyIdentityModule)
      // },
      // {
      //   path: 'payment-method',
      //   loadChildren: () => import('../../../@auth/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
      // },
      // {
      //   path: 'nft-owned-success',
      //   loadChildren: () => import('../../../@auth/nft-owned-success/nft-owned-success.module').then(m => m.NftOwnedSuccessModule)
      // },
      // {
      //   path: 'edit-profile',
      //   loadChildren: () => import('../../../@auth/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      // },
      // {
      //   path: 'my-wallet',
      //   loadChildren: () => import('../../../@auth/my-wallet/my-wallet.module').then(m => m.MyWalletModule)
      // },
      // {
      //   path: 'deposit-crypto',
      //   loadChildren: () => import('../../../@auth/deposit-crypto/deposit-crypto.module').then(m => m.DepositCryptoModule)
      // },
      // {
      //   path: 'withdraw-crypto',
      //   loadChildren: () => import('../../../@auth/withdraw-crypto/withdraw-crypto.module').then(m => m.WithdrawCryptoModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthFooterLayoutRoutingModule { }
