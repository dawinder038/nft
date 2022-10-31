import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';

@Component({
  selector: 'app-signup-step5',
  templateUrl: './signup-step5.component.html',
  styleUrls: ['./signup-step5.component.scss']
})
export class SignupStep5Component implements OnInit {
  otp:any;
  timer:any=60;
  constructor(private router:Router,private httpService:GenericHttpService,private cs:CommonService) { }

  ngOnInit(): void {
    this.startTimer();

  }
sendCode(){
  // this.router.navigate(['/verify-otp'])
  this.verifyOtp();
}

verifyOtp(){
  if(!this.otp){
    return
  }
  let payload:any={};

    payload.otp=this.otp;
  this.httpService.httpRequest('post','user/two-way-authentication/verify', payload).subscribe((res:any)=>{
    console.log(res);
    this.cs.showSuccess(res.message,'Success');
    this.cs.clearLocalStorage();
    this.cs.setLocalStorage("user-session", res?.token);
    // localStorage.setItem("user", res?.user);
    this.cs.setStrLocalStorage("user", res?.user);
    this.cs.loggedIn.next(true);
    // this.cs.removeLocalStorageItem('unVerifiedUser');
    // this.cs.removeLocalStorageItem('verificationToken');
    this.cs.navigate('/home');

  })
}
startTimer() {
  this.timer = 59;
  var refreshIntervalId = setInterval(() => {
    this.timer--;
    if (this.timer == 0) {
      clearInterval(refreshIntervalId);
    }
  }, 1000);
}
resendOtp(){
  this.startTimer();
  let payLoad={
    is_skip:0
  }
  this.httpService.httpRequest('post','user/two-way-authentication',payLoad).subscribe((res:any)=>{
    console.log(res);
    this.cs.showSuccess(res.message,'Success');
  })
}
}
