import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: any;
  submitted: boolean = false;
  loading: boolean = false;
  modal: any;
  one: any;
  two: any;
  three: any;
  four: any;
  code = 91;
  forgetPasswrodError: boolean = false;
  isEmail: boolean = true;
  timer: any = 60;
  isShow: boolean = false;
  refreshIntervalId!: NodeJS.Timeout;
  constructor(
    private fb: FormBuilder,
    private httpService: GenericHttpService,
    private modalService: NgbModal,
    private cs: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      // emailPhone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),

      phone_no: new FormControl('', [
        Validators.maxLength(10),
      ]),
      country_code: new FormControl('', []),
    });
  }
  get f() {
    return this.forgotForm.controls;
  }

  startTimer() {
    this.timer = 60;
    this.refreshIntervalId = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        clearInterval(this.refreshIntervalId);
        this.isShow = false;
      }
    }, 1000);
  }

  resenOtp() {
    this.one = null;
    this.two = null;
    this.three= null;
    this.four= null;
    this.Submit();
  }
  Submit(content?: any) {
    this.loading = true
    let payload: any = {};
    if (this.isEmail) {
      if (this.forgotForm.controls.email.invalid) {
        this.submitted = true;
        this.forgetPasswrodError = true;
        return;
      }
      payload.email = this.forgotForm.value.email;
    } else {
      if (this.forgotForm.controls.phone_no.invalid) {
        this.submitted = true;
        this.forgetPasswrodError = true;
        return;
      }
      payload.country_code = this.code;
      payload.phone_no = this.forgotForm.value.phone_no;
    }
    this.httpService.forgetPassword(payload).subscribe((res: any) => {
      this.cs.showSuccess(res.message, 'Success');
      this.loading = false;
      if (content) {
        this.open(content);
      }
      this.isShow = true;
      this.startTimer();
    });
  }
  open(content: any) {
    this.modalService.dismissAll();
    this.modal = this.modalService.open(content, {
      windowClass: 'headerModalClass',
      centered: true,
    });
  }

  goToNextInput(e: any) {
    var key = e.which,
      t = e.target,
      sib = t.nextElementSibling;
    if (key === 8) {
      return true;
    }
    if (key != 9 && (key < 48 || key > 57) && (key < 96 || key > 105)) {
      e.preventDefault();
      return false;
    }

    if (key === 9) {
      return true;
    }
    if (sib) {
      sib.select();
    }
    return true;
  }

  onKeyDown(e: any) {
    var key = e.which;
    if (
      key === 8 ||
      key === 9 ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105)
    ) {
      if (key === 8) {
        return this.goBackAndClear(e);
      }
      return true;
    }
    e.preventDefault();
    return false;
  }

  goBackAndClear(e: any) {
    let val = e.target.value;
    let sib = e.target.previousElementSibling;
    if (val) {
      return (val = '');
    } else if (!val) {
      return sib.select();
    }
  }
  verifyOtp() {
    let payload: any = {};
    if (this.isEmail) {
      payload.email = this.forgotForm.value.email;
    } else {
      payload.phone_no = this.forgotForm.value.phone_no;
      payload.country_code = this.code;
    }
    payload.otp = this.one + this.two + this.three + this.four;
    this.httpService.submitForgetPasswordOtp(payload).subscribe(
      (res: any) => {
        this.modal.close();
        this.one = null;
        this.two = null;
        this.three= null;
        this.four= null;
        // this.one = this.two = this.three = this.four = '';
        this.cs.showSuccess(res.message, 'Success');
        localStorage.setItem('resetToken', res.token);
        this.router.navigate(['/reset-password']);
      },
      (err: any) => {
        // this.cs.showSuccess(err.error.message?err.error.message:err.error.error_description,'Error');
      }
    );
  }

  getNumber(data: any) {}

  onCountryChange(data: any) {
    console.log(data);
    this.code = data.dialCode;
    // this.countryabbr = data.iso2;
  }
  telInputObject(obj: any) {
    this.code = this.forgotForm.value.country_code
      ? this.forgotForm.value.country_code
      : obj.s.dialCode;
    if (this.code) {
      let itemMatched = obj.p.filter((item: any) => {
        if (item.dialCode == this.code) {
          return item;
        }
      });
      if (itemMatched && itemMatched.length > 0)
        obj.setCountry(itemMatched[0].iso2);
      //obj.setCountry(this.profile.country_abv);
    } else {
      obj.setCountry('cd');
    }
  }
  typeChange(event: any) {
    console.log(event);
    if (event.target.value == 'phone_no') {
      this.isEmail = false;
    } else {
      this.isEmail = true;
    }
  }
}
