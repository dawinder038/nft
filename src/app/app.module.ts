import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './@core/services/interceptor.service';
// import { FooterModule } from './@theme/footer/footer.module';
// import { HeaderModule } from './@theme/header/header.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CompleteFooterComponent } from './@theme/common-components/footers/complete-footer/complete-footer.component';
// import { HeaderModule } from './@theme/common-components/header/header.module';
// import { FooterModule } from './@theme/common-components/footers/footer/footer.module';
// import { CompleteFooterComponent } from './@theme/common-components/footers/complete-footer/complete-footer.component';
import { Web3Service } from './@core/services/web3.service';
// import { LoaderComponent } from './pages/loader/loader.component';
// import { VerifyTwoFactorAuthOtpComponent } from './@auth/verify-two-factor-auth-otp/verify-two-factor-auth-otp.component';
// import { CollectionDetailsModule } from './pages/collection-details/collection-details.module';

@NgModule({
  declarations: [
    AppComponent,

    // VerifyTwoFactorAuthOtpComponent,
    // CompleteFooterComponent,
    // CompleteFooterComponent
  ],

  imports: [
    BrowserModule,
    // CollectionDetailsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // HeaderModule,
    // FooterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },Web3Service],
  bootstrap: [AppComponent]
})

export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
