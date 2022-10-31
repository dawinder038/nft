import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isLoaded: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  projectName:any;
  projectImg:any;
  constructor(private httpService:GenericHttpService,private cs :CommonService) { }

  ngOnInit(): void {
  }
  showGiftCustomers: boolean = false;
  GiftCustomers() {
    setTimeout(() => {
      this.showGiftCustomers = true;
    }, 3500);
  }

  uploadImg(event:any){
    if(event.target.files){
      let file = <File>event.target.files[0];
      if (file) {
        let formData: FormData = new FormData();
        formData.append('file', file);
        this.httpService.uploadImage(formData).subscribe((res: any) => {
          console.log(res);
          this.cs.showSuccess(res.message,'Success');
          this.projectImg=res.filename
          // if (type == 'profilePic') {
          //   this.newProfilePicUrl = res.filename;
          // } else {
          //   this.newCoverImgUrl = res.filename;
          // }
          // this.cs.showSuccess(res.message, 'success');
          // this.submitProfileDetail();
        });
      }
    }
  }
  createProject(){
    let payload={
      name:this.projectName,
      image:this.projectImg
    }
    if(!payload.name){
      this.cs.showError('please enter project name','error');
      return
    }
    if(!payload.image){
      this.cs.showError('please slect project Image','error');
      return
    }
      this.httpService.httpRequest('post','nft/project',payload).subscribe((res:any)=>{
        this.cs.showSuccess(res.message,'Success');
        this.projectName='';
        this.projectImg='';
      })
  }
}
