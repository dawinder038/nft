import { Expression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../../../@core/services/common.service';

@Component({
  selector: 'app-complete-footer',
  templateUrl: './complete-footer.component.html',
  styleUrls: ['./complete-footer.component.scss']
})
export class CompleteFooterComponent implements OnInit {
  email:any='';
  re:RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor(private cs:CommonService,private httpService:GenericHttpService, private router: Router) { }

  ngOnInit(): void {
  }
  subscribe(){
    if(!this.email){
      this.cs.showError('Please Enter Email');
      return
    }
    if(!this.checkValidEmail(this.email)){
      this.cs.showError('Please Enter valid Email')
      return
    }
    let payload={

    }
    this.httpService.httpRequest('post','user/subscribe',payload).subscribe((res:any)=>{
      console.log(res);
      this.email='';
      this.cs.showSuccess(res.message,'Success')
    })
  }
  checkValidEmail(email:any){
    return String(email)
    .toLowerCase()
    .match(this.re)
  }

  openPage() {
    let authToken = String(localStorage.getItem('user-session'));
    if(authToken != "null") {
      this.router.navigateByUrl('/choose-blockchain')
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
