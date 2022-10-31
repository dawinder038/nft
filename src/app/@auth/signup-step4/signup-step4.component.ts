import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../@core/services/common.service';
import { GenericHttpService } from '../../@core/services/generic-http.service';

@Component({
  selector: 'app-signup-step4',
  templateUrl: './signup-step4.component.html',
  styleUrls: ['./signup-step4.component.scss']
})
export class SignupStep4Component implements OnInit {

  constructor(private cs :CommonService,private httpService:GenericHttpService) { }

  ngOnInit(): void {
    this.cs.preventBackButton();
  }
  setTwoWayAuth(){
    let payLoad={
      is_skip:0
    }
    this.httpService.httpRequest('post','user/two-way-authentication',payLoad).subscribe((res:any)=>{
      console.log(res);
      this.cs.showSuccess(res.message,'Success');
      this.cs.navigate('/signup-5');
    })
  }
  skipTwoWayAuth(){
    let payLoad={
      is_skip:1
    }
    this.httpService.httpRequest('post','user/two-way-authentication',payLoad).subscribe((res:any)=>{
      console.log(res);
      this.cs.showSuccess(res.message,'Success');
      this.cs.navigate('/home');
      this.cs.preventBackButton();
    });
  }
}
