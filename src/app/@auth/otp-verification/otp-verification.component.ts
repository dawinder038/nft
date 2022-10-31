import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { CommonService } from '../../@core/services/common.service';
import { GenericHttpService } from '../../@core/services/generic-http.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  one: any;
  two: any;
  three: any;
  four: any;
  unVerifiedPhoneNumber: any;
  phoneVerification: any = {};
  verificationToken: any = '';
  timer: any = 60;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: true,
    classList: {
      inputBox: 'ng-otp-div',
      input: 'ng-otp-input',
      inputFilled: 'ng-otp-filled',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  otp: string = '';
  constructor(
    private cs: CommonService,
    private httpService: GenericHttpService,
    private locationStrategy: LocationStrategy
  ) { }
  ngOnInit(): void {
    let user = this.cs.getParsedLocalStorageData('unVerifiedUserDetails');
    this.unVerifiedPhoneNumber = user.phone_no;
    this.phoneVerification.phone_no = user.phone_no;
    this.phoneVerification.country_code = user.country_code;
    this.verificationToken = this.cs.getLocalStorageData('verificationToken');
    if (!this.unVerifiedPhoneNumber) {
      this.cs.navigate('/login');
    }
    this.startTimer();
  }

  // goToNextInput(e: any) {
  //   var key = e.which,
  //     t = e.target,
  //     sib = t.nextElementSibling;
  //   if (key === 8) {
  //     return true;
  //   }
  //   if (key != 9 && (key < 48 || key > 57) && (key < 96 || key > 105)) {
  //     e.preventDefault();
  //     return false;
  //   }

  //   if (key === 9) {
  //     return true;
  //   }
  //   if (sib) {
  //     sib.select();
  //   }
  //   return true;
  // }

  // onKeyDown(e: any) {
  //   var key = e.which;
  //   if (
  //     key === 8 ||
  //     key === 9 ||
  //     (key >= 48 && key <= 57) ||
  //     (key >= 96 && key <= 105)
  //   ) {
  //     if (key === 8) {
  //       return this.goBackAndClear(e);
  //     }
  //     return true;
  //   }
  //   e.preventDefault();
  //   return false;
  // }

  // goBackAndClear(e: any) {
  //   let val = e.target.value;
  //   let sib = e.target.previousElementSibling;
  //   if (val) {
  //     return (val = '');
  //   } else if (!val) {
  //     return sib.select();
  //   }
  // }


  handeOtpChange(value: string[]): void {
    console.log('aa', value);
    console.log('joined', value.join(''));

    this.otp = value.join('');
  }

  handleFillEvent(value: string): void {
    console.log('fill', value);
    this.otp = value;
    this.verifyOtp();
    // console.log('otp',value.join(''));

  }

  resenOtp() {
    // this.phoneVerification.otp=this.one+this.two+this.three+this.four;
    //  let  payload={
    //     phone_no:'',
    //     contryCode:''
    //   }
    this.startTimer();
    this.httpService
      .httpRequest(
        'post',
        'user/resend/phone',
        this.phoneVerification,
        true,
        this.verificationToken
      )
      .subscribe((res: any) => {
        console.log(res);
        this.cs.showSuccess(res.message, 'Success');
      });
  }
  startTimer() {
    this.timer = 60;
    var refreshIntervalId = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);
  }
  verifyOtp() {
    // if (!this.one || !this.two || !this.three || !this.four) {
    //   return;
    // }
    if (this.otp.length < 4) {
      return
    }
    let payload = this.phoneVerification;
    // payload.otp = this.one + this.two + this.three + this.four;
    payload.otp = this.otp
    this.httpService
      .httpRequest(
        'post',
        'user/phone/verify',
        payload,
        true,
        this.verificationToken
      )
      .subscribe((res: any) => {
        console.log(res);
        // this.cs.showSuccess(res.message, 'Success');
        this.cs.setLocalStorage('user-session', res?.token);
        // localStorage.setItem("user", res?.user);
        this.cs.setStrLocalStorage('user', res?.user);
        this.cs.loggedIn.next(true);
        // this.cs.removeLocalStorageItem('unVerifiedUser');
        // this.cs.removeLocalStorageItem('verificationToken');
        this.cs.navigate('/signup-4');
        this.cs.preventBackButton();
      });
  }
}
