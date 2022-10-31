import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss']
})
export class VerifyIdentityComponent implements OnInit {
  docType: any = '';
  isSubmited: boolean = false;
  isAcknowledge: boolean = false;
  frontUploadedFiles: any = [];
  frontFileData: any = '';
  backUploadedFiles: any = [];
  backFileData: any = '';
  isUploading: boolean = false;
  constructor(private httpService: GenericHttpService, private cs: CommonService) { }

  ngOnInit(): void {
  }

  submitDocument() {
    console.log('yes');
    this.isSubmited = true;
    if(!this.frontFileData || !this.isAcknowledge || !this.docType){
      return
    }
    if(this.docType==2 && !this.backFileData){
      return
    }
    let payload={
      doc_front:this.frontFileData,
      document_back:this.backFileData,
      doc_type:this.docType
    }
    this.httpService.httpRequest('put','user/profile',payload).subscribe((res:any)=>{
      console.log(res);
      this.cs.showSuccess(res.message,'Success');
      this.cs.navigate('home')
      

    })
  }

  upload(event: any, type: number) {

    let file = event.addedFiles[0];
    if (!file) {
      return
    }
    if (this.isUploading) {
      return
    }
    this.isUploading = true;
    if (type == 1) {
      this.frontUploadedFiles = [];
      this.frontUploadedFiles.push(file);
    }
    if (type == 2) {
      this.backUploadedFiles = [];
      this.backUploadedFiles.push(file);
    }
    let formData: FormData = new FormData()
    formData.append('file', file);
    this.httpService.uploadImage(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        if (type == 1) {
          this.frontFileData = res.filename;
          this.cs.showSuccess("Document's Front Side uploaded Successfully", 'Success')
        }
        if (type == 2) {
          this.backFileData = res.filename;
          this.cs.showSuccess("Document's Back Side uploaded Successfully", 'Success')

        }
        this.isUploading = false;
      },
      error:(err:any)=>{
        this.isUploading=false;
        if (type == 1) {
          this.frontUploadedFiles = [];
        }
        if (type == 2) {
          this.backUploadedFiles = [];
        }
      }
    })
  }
}
