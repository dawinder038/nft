import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  retryWhen,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  profileDetail: any = {};
  baseImgUrl: string = this.httpService.originalImgUrl;
  newProfilePicUrl: string = '';
  newCoverImgUrl: string = '';
  localProfileImageUrl: string = '';
  localCoverImageUrl: string = '';

  searchFriends: Subject<string> = new Subject<string>();
  subscription: any;
  userList: any = [];
  subscriptions: Array<Subscription> = [];
  giftedNfts: any = [];
  createdNfts: any = [];
  likedNfts: any = [];
  changePassForm!: FormGroup;
  isLoading: boolean = false;
  isSubmited: boolean = false;
  oldPasswordInputType: string = 'password';
  newPasswordInputType: string = 'password';
  confirmPasswordInputType: string = 'password';
  ownedNfts: any = [];
  selectedQuantity: number = 1;
  selectedNftId: string = '';
  priceForResale: any = 0.1;
  selectedNftType: any = 1;
  selectedNft: any = {};
  collections: any[] = [];
  constructor(
    private cs: CommonService,
    private httpService: GenericHttpService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription = this.searchFriends
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        console.log(res);
        this.users(res);
      });
    this.subscriptions.push(this.subscription);

    this.profileDetail = this.cs.getParsedLocalStorageData('user');
    this.getProfileDetail();
    this.getCreatedNft();
    this.getGiftedNfts();
    this.getLikedNft();
    this.getOwnedNfts();
    this.createChangePassForm();
    this.getAllCollections();
  }
  
  getProfileDetail() {
    const getProfileSubscription = this.httpService
    .getProfileDetail()
    .subscribe((res: any) => {
      this.profileDetail = res;
      this.getActivities();
      this.cs.setStrLocalStorage('user', res);
      });
    this.subscriptions.push(getProfileSubscription);
  }
  uploadProfile(event: any, type?: string) {
    let file = <File>event.target.files[0];
    if (file) {
      if (type == 'profilePic') {
        this.localProfileImageUrl = URL.createObjectURL(event.target.files[0]);
      } else {
        this.localCoverImageUrl = URL.createObjectURL(event.target.files[0]);
      }
      let formData: FormData = new FormData();
      formData.append('file', file);
      const uploadProfileSubscription = this.httpService
        .uploadImage(formData)
        .subscribe((res: any) => {
          console.log(res);
          if (type == 'profilePic') {
            this.newProfilePicUrl = res.filename;
          } else {
            this.newCoverImgUrl = res.filename;
          }
          // this.cs.showSuccess(res.message, 'success');
          this.submitProfileDetail();
        });
      this.subscriptions.push(uploadProfileSubscription);
    }
  }
  submitProfileDetail() {
    let payload: any = {};
    console.log(typeof payload);

    if (this.newCoverImgUrl) {
      payload.cover_image = this.newCoverImgUrl;
    }
    if (this.newProfilePicUrl) {
      payload.profile_pic = this.newProfilePicUrl;
    }
    console.log(typeof payload);

    const submitProfileSubscription = this.httpService
      .editProfileDetail(payload)
      .subscribe((res: any) => {
        if (this.newCoverImgUrl) {
          this.profileDetail.cover_image = this.newCoverImgUrl;
          this.newCoverImgUrl = '';
        }
        if (this.newProfilePicUrl) {
          this.profileDetail.profile_pic = this.newProfilePicUrl;
          this.newProfilePicUrl = '';
        }
        this.cs.setStrLocalStorage('user', this.profileDetail);
        // this.getProfileDetail();
        this.cs.userProfileChange.next(true);
        console.log(res);
        this.cs.showSuccess(res.message, 'Success');
      });
    this.subscriptions.push(submitProfileSubscription);
  }
  findFriends(event: any) {
    this.searchFriends.next(event.target.value);
  }

  users(perm: any) {
    let payload = {
      keyword: perm,
    };
    const findeFrendsSubscriptions = this.httpService
      .httpRequest('get', 'user/friends', payload)
      .subscribe((res: any) => {
        console.log(res);
        this.userList = res;
      });
    this.subscriptions.push(findeFrendsSubscriptions);
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  shareBYCopy(id: string) {
    let path = location.origin + '/user-profile/' + id;
    this.copy(path);
  }

  copy(val: string) {
    navigator.clipboard.writeText(val);
    this.cs.showSuccess('Copied to clipboard.', '');
  }
  sharemailUrl(id: string) {
    let url = location.origin + '/user-profile/' + id;
    window.open(
      'mailto:?subject=' +
      encodeURIComponent(document.title) +
      '&body=' +
      encodeURIComponent(url)
    );
  }
  shareinstaUrl(id: string) {
    let url = location.origin + '/user-profile/' + id;
    window.open(
      'https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' +
      encodeURIComponent(document.title) +
      ':%20 ' +
      encodeURIComponent(url + 'add custom text here')
    );
  }
  sharefacebookUrl(id: string) {
    let url = location.origin + '/user-profile/' + id;
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
    );
  }
  getGiftedNfts() {
    this.httpService.httpRequest('get', 'gifted-nfts').subscribe((res: any) => {
      this.giftedNfts = res.nfts
    })
  }
  getCreatedNft() {
    this.httpService.httpRequest('get', 'nfts/created').subscribe((res: any) => {
      this.createdNfts = res[0].data
    })
  }
  getLikedNft() {
    this.httpService.httpRequest('get', 'nfts/liked').subscribe((res: any) => {
      this.likedNfts = res[0].data
    })
  }
  getOwnedNfts() {
    this.httpService.httpRequest('get', 'nfts/owned').subscribe((res: any) => {
      this.ownedNfts = res[0].data;
      console.log(this.ownedNfts);

    })
  }

  makePrivate(id: any, isPrivate: any, isGifted = false) {
    let payload = {
      is_gifted: isGifted,
      nft_id: id,
      is_private: !isPrivate
    }
    this.httpService.httpRequest('put', 'nft/make-private', payload).subscribe((res: any) => {
      console.log(res);
      this.cs.showSuccess(res.message, 'Success')
    })
  }
  likeUnlike(id: any) {
    let payload = {
      nft_id: id,
    };
    this.httpService
      .httpRequest('post', 'nft/like', payload)
      .subscribe((res: any) => {
        console.log(res);
        this.cs.showSuccess(res.message, 'success');
      });
  }
  createChangePassForm() {
    this.changePassForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    })

  }
  changePassword(modalClose: any) {
    this.isLoading = true;

    let value = this.changePassForm.value;
    if (value.new_password != value.confirm_password) {
      this.isSubmited = true;
      this.isLoading = false;
      return
    }
    if (this.changePassForm.invalid) {
      return
    }
    let payload = {
      old_password: value.old_password,
      new_password: value.new_password
    }

    this.httpService.httpRequest('post', 'user/change-password', payload).subscribe({
      next: (res: any) => {
        console.log(res);
        modalClose.click();
        this.isLoading = false;
        this.isSubmited = false;
        this.cs.showSuccess(res.message, 'Success');
        this.changePassForm.reset();
      },
      error: (err: any) => {
        this.isLoading = false;
      }
    })
  }
  seleNftForResale(nft: any) {
    this.selectedQuantity = 1;
    this.selectedNftId = nft._id;
    this.selectedNft = nft;

  }

  isLoader: boolean = false;
  putNftOnMarketPlace(modalClose: any) { 
    this.isLoader =  true;
    let checkApprovalRequest = {
      collection_address: this.selectedNft.collection_address
    }
    this.httpService.httpRequest('get', 'nft/owner/approval', checkApprovalRequest).subscribe((res: any) => {
      if (res.result[0].value) {
        this.resellNft(modalClose);
      } else {
        this.approveCollection().subscribe((res: any) => {
          this.checkStatusOfApproval().subscribe((res: any) => {
            this.resellNft(modalClose);
          })
        })
      }
    })
  }

  approveCollection() {
    let payload = {
      collection_address: this.selectedNft.collection_address
    }
    return this.httpService.httpRequest('post', 'nft/approve/owner', payload)
  }
  resellNft(modalClose: any) {
    let payLoad = {
      "nft_id": this.selectedNftId,
      "price": this.priceForResale,
      "quantity": this.selectedQuantity
    }
    this.httpService.httpRequest('post', 'nft/resell', payLoad).subscribe((res: any) => {
      this.cs.showSuccess("NFT resell successfully", "Success");
      console.log(res);
      modalClose.click();
      this.isLoader =  false;
    })
  }
  checkStatusOfApproval() {
    let payLoad = {
      collection_address: this.selectedNft.collection_address
    }
    return this.httpService.httpRequest('get', 'nft/owner/approval', payLoad).pipe(
      map((res: any) => {
        if (res.result[0].value === false) throw new Error('Invalid Value');
        return res;
      }),
      retryWhen((err: any) => {
        console.log(err);
        err.pipe(
          tap(() => console.log('error occurred owner not approved yet ')),
          delay(4000),
          tap(() => console.log('Retrying ...'))
        );
        return err;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  getAllCollections() {
    this.httpService.httpRequest('get', 'nft/collections').subscribe((res: any) => {
      this.collections = res.collections;
    });
  }

  /** ====== Get Activities ============ */
  isAcitivityView: boolean = false;
  activities: any[] = [];
  activityLabel: String = "";
  getActivities() {
    this.isAcitivityView = true;
    let payload = {
      user_id: this.profileDetail._id,
      page: 1,
      limit: 10
    }
    this.httpService.httpRequest('get', 'activities', payload).subscribe((response: any) => {
      this.activities = response.activities;
      if(this.activities.length == 0) {
        this.activityLabel = 'No Activity is Available';
        this.isAcitivityView = false;
      } else {
        this.isAcitivityView = false;
      }
    })
  }
}
