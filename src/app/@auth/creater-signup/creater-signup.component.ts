import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { noWhitespaceValidator } from 'src/app/@core/validators/whitespace.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-creater-signup',
  templateUrl: './creater-signup.component.html',
  styleUrls: ['./creater-signup.component.scss']
})
export class CreaterSignupComponent implements OnInit {

  personalDetails: boolean = false;
  signUpForm!: FormGroup;
  signUpForm2: any;
  submitted1: boolean = false;
  submitted2: boolean = false;
  loading: boolean = false;
  countriesList: any[] = [];
  statesList: any[] = [];
  confirmPasswordInputType:string='password';
  passwordInputType:string='password';
  isEmailExist:boolean=false;
  constructor(private fb: FormBuilder,
    private httpService: GenericHttpService,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirm_password: new FormControl('', [Validators.required])
    }, {
      validators: ConfirmedValidator('password', 'confirm_password')
    });
    this.signUpForm
    .get('email')
    ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((value:string) => {
      this.isEmailExist=false;
      console.log('email value changed');
      console.log(value);
     this.checkEmailAvalability(value)
    });
  }

  checkEmailAvalability(email:string){
      if(this.signUpForm.controls['email'].valid){
        this.httpService.checkEmailAvalability(email).subscribe((res:any)=>{
          this.isEmailExist=res.email_exist?true:false
        })
      }
  }

  Next() {
    this.submitted1 = true;
    if (this.signUpForm.invalid) {
      return
    }
    if(this.isEmailExist){
      return
    }
    this.httpService.SignUp(this.signUpForm.value).subscribe({
      next: (res: any) => {

        // this.commonService.showSuccess('Verification Email Sent To Your Email Account','');
        this.commonService.clearLocalStorage();
        this.commonService.setLocalStorage('unVerifiedEmail',this.signUpForm.value.email);
        this.commonService.setLocalStorage('unVerifiedEmailVerificationToken',res.token);
        this.router.navigate(['/verify-email']);
        // this.personalDetails = true;
      }, error: (err: any) => {

      }
    })
  }
  keyPressAlphaNumeric(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
