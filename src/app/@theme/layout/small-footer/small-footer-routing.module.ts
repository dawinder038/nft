import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@gaurds/@auth-guard/auth.guard';
import { SmallFooterComponent } from './small-footer.component';

const routes: Routes = [

  {
    path: '',
    component: SmallFooterComponent,
    children: [
      {
        path: 'create-collectible-item',
        loadChildren: () => import('../../../@auth/create-collectible-item/create-collectible-item.module').then(m => m.CreateCollectibleItemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'create-single-item',
        loadChildren: () => import('../../../@auth/create-single-item/create-single-item.module').then(m => m.CreateSingleItemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'deposit-crypto',
        loadChildren: () => import('../../../@auth/deposit-crypto/deposit-crypto.module').then(m => m.DepositCryptoModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../../../@auth/edit-profile/edit-profile.module').then(m => m.EditProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'my-wallet',
        loadChildren: () => import('../../../@auth/my-wallet/my-wallet.module').then(m => m.MyWalletModule)
      },
      {
        path: 'nft-owned-success',
        loadChildren: () => import('../../../@auth/nft-owned-success/nft-owned-success.module').then(m => m.NftOwnedSuccessModule)
      },
      {
        path: 'payment-method',
        loadChildren: () => import('../../../@auth/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
      },
      {
        path: 'verify-identity',
        loadChildren: () => import('../../../@auth/verify-identity/verify-identity.module').then(m => m.VerifyIdentityModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'withdraw-crypto',
        loadChildren: () => import('../../../@auth/withdraw-crypto/withdraw-crypto.module').then(m => m.WithdrawCryptoModule)
      },

      {
        path: 'signup-5',
        loadChildren: () => import('../../../@auth/signup-step5/signup-step5.module').then(m => m.SignupStep5Module)
      },
      {
        path: 'bid',
        loadChildren: () => import('../../../pages/bid/bid.module').then(m => m.BidModule)
      },

      // {
      //   path: '/signup',
      //   loadChildren: () => import('../../../@auth/signup/signup.module').then(m => m.SignupModule)
      // }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmallFooterRoutingModule { }
