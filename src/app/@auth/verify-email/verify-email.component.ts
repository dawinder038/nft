import { Component, OnDestroy, OnInit } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';
import { CommonService } from '../../@core/services/common.service';
import { GenericHttpService } from '../../@core/services/generic-http.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  email: any;
  token: any;
  isEmailVerified: boolean = false;
  vfToken: any;
  isButtondisable: boolean = false;
  constructor(
    private cs: CommonService,
    private httpService: GenericHttpService
  ) {
    this.vfToken = this.cs.getLocalStorageData('verificationToken');
    if (!this.vfToken) {
      let email = this.cs.getLocalStorageData('unVerifiedEmail');
      this.token = this.cs.getLocalStorageData(
        'unVerifiedEmailVerificationToken'
      );

      if (!email || !this.token) {
        this.cs.navigate('/home');
      }
      this.email = email;
    }
  }

  ngOnInit(): void {
    this.cs.preventBackButton();
    this.checkEmailVerification();
    this.sendVerificationEmail();
  }

  sendVerificationEmail() {
    if(this.isButtondisable){
      return
    }
    this.isButtondisable = true;
    let payload = {
      email: this.email,
    };
    this.httpService
      .sendVerificationEmail(payload, this.token)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.isButtondisable = false;
          this.cs.showSuccess(res.message, 'success');
        }, error: (err: any) => {
          this.isButtondisable = false;
        }
      });
  }

  checkEmailVerification() {
    let vfToken = this.vfToken;
    if (!vfToken) {
      this.httpService
        .httpRequest(
          'get',
          'user/check-email-verification',
          '',
          true,
          this.token
        )
        .subscribe((res: any) => {
          console.log(res);
          if (res.is_email_verified) {
            if (!vfToken) {
              this.cs.setLocalStorage('verificationToken', res.token);
              this.cs.navigate('/personal-details');
            } else {
              this.cs.navigate('/personal-details');
            }
          } else {
            // this.sendVerificationEmail();
          }
        });
    } else {
      this.cs.navigate('/personal-details');
    }
  }
logOut(){
  this.cs.clearLocalStorage();
}
  ngOnDestroy(): void {
    this.cs.removeLocalStorageItem('unVerifiedEmail');
    this.cs.removeLocalStorageItem('unVerifiedEmailVerificationToken');
  }
}
