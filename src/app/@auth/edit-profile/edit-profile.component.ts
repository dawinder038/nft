import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @ViewChild('editPhotoModal') editPhotoModal!: TemplateRef<any>
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200,
  };
  editProfileForm: FormGroup;
  isValidUrl: boolean = false;
  bioMaxLength = 260;
  profileDetail: any = {};
  newProfilePicUrl: string = '';
  newCoverImgUrl: string = '';
  localCoverImageUrl: string = '';
  localProfileImageUrl: string = '';
  originalImgUrl = this.httpService.originalImgUrl;
  baseImgUrl: string = this.originalImgUrl;
  isFormSubmited: boolean = false;
  isUsernameAvailable: boolean = true;
  isCoverLoading: boolean = false;
  isProfileLoading: boolean = false;
  isFormSubmitLoader: boolean = false;
  profilePicStyle: any = {
    height: '100%',
    width: '100%',
  };
  newPasswordInputType: string = 'password';
  confirmPasswordInputType: string = 'password';
  isMouseDown: boolean = false;
  cover_image_y_axis: number = 50;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  globalFormData: any = '';
  modalOptions!: NgbModalOptions;
  modeRef: any = '';



  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  profilePicData: any = '';
  constructor(
    private fb: FormBuilder,
    private cs: CommonService,
    private httpService: GenericHttpService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private modalService: NgbModal,

  ) {
    this.profileDetail = this.cs.getParsedLocalStorageData('user');

    this.editProfileForm = this.fb.group({
      nick_name: [''],
      user_name: ['', [Validators.required]],
      bio: [''],
      personal_link: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      new_password: [''],
      confirm_password: [''],
    });
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      // centered:true,
      size: 'lg',
    };
  }

  ngOnInit(): void {
    console.log(this.el);

    this.profileDetail = this.cs.getParsedLocalStorageData('user');
    // if(this.profileDetail.user_type==2){
    //   this.el.nativeElement.parentElement.classList.add('partner');
    // }
    // this.value = this.profileDetail.image_size;
    this.cover_image_y_axis = Number(this.profileDetail.cover_image_y_axis);
    this.profilePicStyle = {
      height: this.value + '%',
      width: this.value + '%',
    };
    this.setFormValues();
    this.getProfileDetail();

    this.editProfileForm
      .get('user_name')
      ?.valueChanges.pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((value: string) => {
        console.log('user_name value changed');
        console.log(value);
        this.checkUsernameAvalability(value);
      });
  }
  checkUsernameAvalability(value: string) {
    this.httpService.checUsernameAvalability(value).subscribe((res: any) => {
      this.isUsernameAvailable = res.user_name_exist ? false : true;
    });
  }
  getProfileDetail() {
    this.httpService.getProfileDetail().subscribe((res: any) => {
      this.profileDetail = res;
      this.cs.setStrLocalStorage('user', res);
      this.setFormValues();
      // this.value = this.profileDetail.image_size;
      this.cover_image_y_axis = Number(this.profileDetail.cover_image_y_axis);
      this.profilePicStyle = {
        height: this.value + '%',
        width: this.value + '%',
      };
      if (this.profileDetail.personal_link) {
        this.checkUrl();
      }
    });
  }

  setFormValues() {
    this.editProfileForm.setValue({
      nick_name: this.profileDetail.nick_name,
      user_name: this.profileDetail.user_name,
      bio: this.profileDetail.bio,
      personal_link: this.profileDetail.personal_link,
      first_name: this.profileDetail.first_name,
      last_name: this.profileDetail.last_name,
      new_password: '',
      confirm_password: '',
    });
  }

  checkUrl() {
    var res = this.editProfileForm.value?.personal_link.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res === null) {
      this.isValidUrl = false;
    } else {
      this.isValidUrl = true;
    }
  }

  submitProfileDetail() {
    this.isFormSubmited = true;

    if (!this.isUsernameAvailable) {
      return;
    }
    if (this.editProfileForm.invalid) {
      this.isFormSubmited = true;
      return;
    }
    if (this.f['bio'].value?.length > this.bioMaxLength) {
      this.cs.showError('Bio cross maximum char limite');
      return;
    }
    if (this.f['personal_link'].value?.length && !this.isValidUrl) {
      this.cs.showError('Invalid or Broken Link', 'error');
      return;
    }
    if (
      this.editProfileForm.value.new_password.length &&
      this.editProfileForm.value.new_password !=
      this.editProfileForm.value.confirm_password
    ) {
      return;
    }
    if (
      this.editProfileForm.value.new_password.length &&
      this.editProfileForm.value.new_password.length < 8
    ) {
      return;
    }
    this.isFormSubmitLoader = true;
    console.log(this.editProfileForm);
    let payload = this.editProfileForm.value;
    payload.image_size = this.value;
    payload.cover_image_y_axis = this.cover_image_y_axis;
    if (this.newCoverImgUrl) {
      payload.cover_image = this.newCoverImgUrl;
    }
    if (this.newProfilePicUrl) {
      payload.profile_pic = this.newProfilePicUrl;
    }
    this.httpService.editProfileDetail(payload).subscribe(
      (res: any) => {
        console.log(res);
        this.isFormSubmitLoader = false;

        this.cs.showSuccess(res.message, 'Success');
        this.router.navigate([
          this.profileDetail.user_type == 1 ? '/my-profile' : '/profile',
        ]);
      },
      (err: any) => {
        this.isFormSubmitLoader = false;
      }
    );
  }
  get f() {
    return this.editProfileForm.controls;
  }
  uploadProfile(event: any, type?: string) {
    this.isCoverLoading = true;
    let file = <File>event.target.files[0];
    if (file) {
      if (type == 'profilePic') {
        this.localProfileImageUrl = URL.createObjectURL(event.target.files[0]);
      } else {
        this.localCoverImageUrl = URL.createObjectURL(event.target.files[0]);
      }
      let formData: FormData = new FormData();
      formData.append('file', file);
      this.httpService.uploadImage(formData).subscribe((res: any) => {
        this.isCoverLoading = false;
        console.log(res);
        if (type == 'profilePic') {
          this.newProfilePicUrl = res.filename;
        } else {
          this.newCoverImgUrl = res.filename;
          this.profileDetail.cover_image = this.newCoverImgUrl;
        }
        this.cs.showSuccess(res.message, 'success');
      });
    }
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  changeSize() {
    console.log(this.value);
    this.profilePicStyle = {
      height: this.value + '%',
      width: this.value + '%',
    };
  }

  mouseup() {
    this.isMouseDown = false;
  }

  mousedown() {
    this.isMouseDown = true;
  }
  mousemove(event: any) {
    if (this.isMouseDown) {
      console.log(event, 's', this.cover_image_y_axis);
      // console.log(event.pageY);
      if (event.movementY < 0) {
        this.cover_image_y_axis += 0.5;
      } else if (event.movementY > 0) {
        this.cover_image_y_axis -= 0.5;
      }
      if (this.cover_image_y_axis < 0) {
        this.cover_image_y_axis = 0;
      }
      if (this.cover_image_y_axis > 100) {
        this.cover_image_y_axis = 100;
      }
    }
  }
  ngOnDestroy(): void {
    // if(this.profileDetail.user_type==2){
    //   this.el.nativeElement.parentElement.classList.remove('partner');
    // }
  }
  fileChangeEvent(event: any): void {
    // this.localProfileImageUrl=URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0]) {
      this.openEditPhotoModal();
      this.imageChangedEvent = event;

    }
  }


  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
  }
  dataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  uploadFormData() {
    this.isProfileLoading = true;
    const file = this.dataURIToBlob(this.croppedImage);
    this.localProfileImageUrl = URL.createObjectURL(file);
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    this.globalFormData = formData;
    // let formData =this.globalFormData
    // this.localProfileImageUrl='';
    this.httpService.uploadImage(formData).subscribe((res: any) => {
      this.isProfileLoading = false;
      console.log(res);
      this.newProfilePicUrl = res.filename;
      this.cs.showSuccess(res.message, 'success');
      this.hideModal();
    });
    // }
  }

  openEditPhotoModal() {
    this.modeRef = this.modalService.open(
      this.editPhotoModal,
      this.modalOptions
    );
    this.profilePicData = '';
  }
  hideModal() {
    this.modeRef.close();
  }
  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
