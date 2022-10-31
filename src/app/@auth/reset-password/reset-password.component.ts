import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  passwordInputType = 'password';
  confirmPasswordInputType = 'password';
  resetPasswordForm: FormGroup;
  isSubmit: boolean = false;
  mustMatch: boolean = false;
  constructor(
    private fb: FormBuilder,
    private httpService: GenericHttpService,
    private cs: CommonService,
    private router: Router
  ) {
    let token = localStorage.getItem('resetToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]],
      unique_code: [token],
    },{
      validators: ConfirmedValidator('password', 'confirm_password')

    });
  }

  ngOnInit(): void {}
  get f() {
    // console.log(this.loginForm.controls)
    return this.resetPasswordForm.controls;
  }
  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.isSubmit = true;
      return;
    }
    if (
      this.resetPasswordForm.value.password !=
      this.resetPasswordForm.value.confirm_password
    ) {
      this.isSubmit = true;
      this.mustMatch = true;
      return;
    }
    let payload = {
      password: this.resetPasswordForm.value.password,
    };
    this.httpService
      .resetPassword(
        this.resetPasswordForm.value,
        this.resetPasswordForm.value.unique_code
      )
      .subscribe(
        (res: any) => {
          this.cs.showSuccess(res.message, 'Success');
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.router.navigate(['/login']);
        }
      );
  }
}
