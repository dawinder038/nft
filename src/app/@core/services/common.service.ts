import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  userProfile = new Subject<any>();
  userProfileChange = new Subject<boolean>();

  loggedIn= new Subject<boolean>();
  changeLoginObservable = this.loggedIn.asObservable();


  openCreate =  new Subject<any>();
  openGiftCustomer:boolean=false;

  constructor(private toastr: ToastrService,private router:Router,private locationStrategy: LocationStrategy) {
    toastr.toastrConfig.preventDuplicates = true;
    // this.changeLoginObservable.subscribe((res:any)=>{
    //   if(res){
    //     this.
    //   }
    // })
  }
  showSuccess(msg: string, title: string = "Success") {
    this.toastr.success(msg, title,{ timeOut: 2000 });
  }

  showError(msg: string, title: string = "Error") {
    this.toastr.error(msg, title,{ timeOut: 3000 });
  }
  unauthorized(){
    this.showError('Please login to Continue.', 'Unauthorized');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigate(path:string){
    this.router.navigate([path])
  }
  navigateByOptionalPerms(path:string,params:object){
    this.router.navigate([path],{queryParams:params});
  }

  copy(text:string){
    navigator.clipboard.writeText(text);
    this.showSuccess('Copied')
  }

  getLocalStorageData(name:string){
    return localStorage.getItem(name);
  }
  getParsedLocalStorageData(name:string){
    return JSON.parse(localStorage.getItem(name)||"{}");
  }
  setLocalStorage(name:string,data:string){
    localStorage.setItem(name,data);
  }
  removeLocalStorageItem(name:string){
    localStorage.removeItem(name);
  }
  setStrLocalStorage(name:string,data:any){
    if(data){
      localStorage.setItem(name,JSON.stringify(data));
    }
  }

getUserType(){
 return this.getParsedLocalStorageData('user')?.user_type
}


  clearLocalStorage(){
    localStorage.clear();
  }
  isUserLogedIn(){
    let userSession = localStorage.getItem('user-session');
    if(userSession){
      return true
    }
    return false
  }
  preventBackButton() {
    setTimeout(()=>{
      history.pushState(null, 'null', location.href);
      this.locationStrategy.onPopState(() => {
        history.pushState(null, 'null', location.href);
      });
    },100)

  }

}
