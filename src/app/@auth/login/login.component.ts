import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: any;
  submitted: boolean = false;
  pwdType: string = "password";
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private httpService: GenericHttpService,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      keep_signed_in: [false]
    });
  }
  ToggleType() {
    if (this.pwdType == "password")
      this.pwdType = "text";
    else
      this.pwdType = "password";
  }
  Login() {
    this.submitted = true;
    if (this.loginform.valid) {
      if (!this.loading) {
        this.loading = true;
        this.httpService.Login(this.loginform.value).subscribe(
          {
            next: (res: any) => {
              this.commonService.clearLocalStorage();
              this.commonService.setStrLocalStorage("user", res?.user);
              if(res?.user.user_type==1){
                if(!res?.user.is_email_verified){
                  //  this.commonService.navigate('/')
                   this.commonService.setLocalStorage('unVerifiedEmail',res.user.email)
                   this.commonService.setLocalStorage('unVerifiedEmailVerificationToken',res.token);
                   this.commonService.setStrLocalStorage('unVerifiedUserDetails', res.user);
                  //  this.commonService.setLocalStorage('verificationToken',res.token);
                   this.router.navigate(['/verify-email']);
                  }else if(!res?.user.is_personal_detail_filled){
                    this.commonService.setLocalStorage('verificationToken',res.token);
                    this.commonService.setStrLocalStorage('unVerifiedUserDetails', res.user);
                    this.router.navigate(['/personal-details']);
                  }else if(!res?.user.is_phone_verified){
                    this.commonService.setLocalStorage('verificationToken',res.token);
                    this.commonService.setStrLocalStorage('unVerifiedUserDetails', res.user);
                    this.router.navigate(['//verify-otp']);
                  }else if(!res?.user.is_two_way_auth_verified && res?.user.is_two_way_auth_enabled){
                    this.commonService.setLocalStorage('twoFactorAuthenticationToken',res.token);
                    this.commonService.setStrLocalStorage('twoFactorAuthenticationUserDetail', res.user);
                    this.commonService.navigate('/two-factor-verification')
                  }
                  else{
                    // this.commonService.showSuccess(res.message);
                    // localStorage.setItem("user-session", res?.token);
                    this.commonService.setLocalStorage("user-session", res?.token);
                    // localStorage.setItem("user", res?.user);
                    this.commonService.setStrLocalStorage("user", res?.user);
                    this.commonService.loggedIn.next(true);
                    this.router.navigate(['/home']);
                  }
              }else if(res?.user.user_type==2){
                    this.commonService.setLocalStorage("user-session", res?.token);
                    this.commonService.setStrLocalStorage("user", res?.user);
                    this.commonService.loggedIn.next(true);
                    this.router.navigate(['/home']);
              }



              this.loading = false;
            },
            error: (err) => this.loading = false
          }
        );
      }
    }
  }
}
