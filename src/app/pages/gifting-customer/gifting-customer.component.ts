import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartDataSets, ChartType, ChartOptions, } from 'chart.js';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subject,
  Subscription,
} from 'rxjs';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { InputFiles } from 'typescript';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Color, Label } from 'ng2-charts';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/@core/services/web3.service';

@Component({
  selector: 'app-gifting-customer',
  templateUrl: './gifting-customer.component.html',
  styleUrls: ['./gifting-customer.component.scss'],
})
export class GiftingCustomerComponent implements OnInit {
  @ViewChild('gasFeeModal') gasFeeModal: any;

  isLoaded: boolean = false;
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      // backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public chartColors: any[] = [{
    backgroundColor: "#f2f2f2"
  }];
  public barChartLabels: Label[] = ['0', '100k', '300', '450', '500'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 100, 300, 450, 500] }

  ];


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        // items: 1,
        // skip_validateItems:false
      },
      // 400: {
      //   items: 2,
      //   skip_validateItems:false
      // },
      // 575: {
      //   items: 3,
      //   skip_validateItems:false
      // },
      // 740: {
      //   items: 4,
      //   skip_validateItems:false
      // },
      // 940: {
      //   items: 5,
      //   skip_validateItems:false
      // }
    },
    nav: true,
  };

  custom2Options: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        // items: 1,
        skip_validateItems: false,
      },
      // 400: {
      //   items: 2,
      //   skip_validateItems:false
      // },
      // 575: {
      //   items: 3,
      //   skip_validateItems:false
      // },
      // 740: {
      //   items: 4,
      //   skip_validateItems:false
      // },
      // 940: {
      //   items: 5,
      //   skip_validateItems:false
      // }
    },
    nav: true,
  };
  responsiveSlider: any = {
    0: {
      items: 1,
      skip_validateItems: false,
    },
    400: {
      items: 2,
      skip_validateItems: false
    },
    575: {
      items: 3,
      skip_validateItems: false
    },
    740: {
      items: 4,
      skip_validateItems: false
    },
    940: {
      items: 5,
      skip_validateItems: false
    }

  }
  totalAvailableNfts: any;
  isUploadedGiftNft: boolean = false;
  GiftCustSlider() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  collectionName: any;
  collectionDescription: any;
  collectionSymbol: any;
  collectionShortUrl: any;
  projectImg: any;
  isCreateProject: boolean = false;
  availableProjectsList: any = [];
  baseImgUrl: string = this.httpService.originalImgUrl;
  subscription: any;
  profileDetail: any;

  newProfilePicUrl: string = '';
  newCoverImgUrl: string = '';
  localProfileImageUrl: string = '';
  localCoverImageUrl: string = '';

  searchFriends: Subject<string> = new Subject<string>();
  userList: any = [];
  subscriptions: Array<Subscription> = [];

  singleTransferForm: FormGroup;
  selectedProject: any = null;
  showGiftCustomers: boolean = false;
  tabContentShow = 1;
  selectedNft: any;
  isLoading: boolean = false;
  files: File[] = [];
  projectImage: any;
  profilePicStyle: any = {
    height: '100%',
    width: '100%'
  }
  giftedNfts: any;
  nftLimit: any;
  mediaType: any;
  fileData: any;
  uploading: boolean = false;
  nftCreateForm!: FormGroup;
  selectedProjectUserId: any;
  nftUploadedFiles: any = [];
  nftFile: any;
  nftType: any = 2;
  isSubmited: boolean = false;
  gasFee: any;
  nftPayload: any;
  walletAddress: any = '';
  accountNumber: any = '';
  modeRef: any;
  modalOptions!: NgbModalOptions;
  bnbValue: any;
  isLazyMinting: boolean = false;
  isCreatingNft: boolean = false;
  userType: any = 2;
  selectedCollection: any;
  constructor(

    private httpService: GenericHttpService,
    private cs: CommonService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private web: Web3Service,
    private el: ElementRef

  ) {
    this.singleTransferForm = this.fb.group({
      email1: '',
      email2: '',
      email3: '',
      email4: '',
      email5: '',
    });
  }

  ngOnInit(): void {
    this.profileDetail = this.cs.getParsedLocalStorageData('user');
    if (this.profileDetail.user_type == 2) {
      this.el.nativeElement.parentElement.classList.add('partner');
    }
    if (this.cs.openGiftCustomer) {
      this.tabContentShow = 4;
      this.GiftCustomers();
    }
    this.subscription = this.searchFriends
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res: any) => {
        console.log(res);
        this.users(res);
      });
    this.subscriptions.push(this.subscription);

    this.getProfileDetail();
    this.getProjects();
    this.createNftPartnerForm();
    let walletAddresSubscription = this.web.walletaddress.subscribe(
      (res: string) => {
        if (res && this.walletAddress != res) {
          this.walletAddress = res;
          this.accountNumber = res;
          if (this.accountNumber) {
          }
        }
      }
    );
    this.subscriptions.push(walletAddresSubscription);
    const bnbValueSubscription = this.web.BNB_VALUE.subscribe((res: any) => {
      this.bnbValue = res;
    });
    this.subscriptions.push(bnbValueSubscription);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  GiftCustomers() {
    setTimeout(() => {
      this.showGiftCustomers = true;
    }, 1000);
  }


  uploadProjectImage(event: any) {
    this.projectImage = [];
    this.projectImage.push(...event.addedFiles);
    let formData: FormData = new FormData();
    formData.append('file', this.projectImage[0]);
    this.httpService.httpRequest('post', 'pin-image-to-ipfs', formData, true).subscribe((res: any) => {
      console.log(res);
      this.cs.showSuccess(res.message, 'Success');
      this.projectImg = 'https://nftwist.infura-ipfs.io/ipfs/' + res.added.path;
    });
  }


  /** Here Start Create Collection Logic */
  /** ====================================================================================================================================================================== */

  isCollectionLoader: boolean = false;
  createProject() {
    let payload = {
      "name": this.collectionName,
      "image": this.projectImg,
      "description": this.collectionDescription,
      "symbol": this.collectionSymbol,
      "short_url": 'nftwist.io/' + this.collectionShortUrl,
      "type": 2,
      "is_project": true
    };
    if (!payload.name) {
      this.cs.showError('Please Enter Project Name', 'Error');
      return;
    }
    if (!payload.image) {
      this.cs.showError('Please Select Project Image', 'Error');
      return;
    }
    if (!payload.description) {
      this.cs.showError('Please Select Collection Description', 'Error');
      return;
    }
    if (!payload.symbol) {
      this.cs.showError('Please Select Collection Symbol', 'Error');
      return;
    }
    if (!payload.short_url) {
      this.cs.showError('Please Select Collection ShortUrl', 'Error');
      return;
    }
    this.isCollectionLoader = true;
    this.httpService.httpRequest('post', 'nft/collection', payload).subscribe((resp: any) => {
      this.checkTransactionHash(resp.data.txn_id, resp)
      },
        (error: any) => {
          this.isCollectionLoader = false;
        });
  }

  checkTransactionHash(trans_id: string, resp: any) {
    let payload = {
      txn_id: trans_id
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-hash', payload).subscribe((res: any) => {
        if (res.txn_hash != null) {
          this.checkStatusOfCollection(res.txn_hash, resp);
          clearInterval(interval);
        }
      }, (err: any) => {
        console.log('checkHashError ', err);
        this.isCollectionLoader =  false;
        clearInterval(interval);
      })
    }, 3000)
  }

  checkStatusOfCollection(tnxHash: any, res: any) {
    let payload = {
      txn_hash: tnxHash,
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'collection/txn-status', payload).subscribe((resp: any) => {
        if (resp.status == 'SUCCEEDED') {
          clearInterval(interval);
          this.cs.showSuccess('Collection Created Successfully', 'Success');
          this.collectionName = '';
          this.projectImg = '';
          this.selectedCollection = res.data._id
          this.nftCreateForm.patchValue({
            collection: res.data._id
          })
          this.isCollectionLoader =  false;
          this.tabContentShow = 5;
          this.GiftCustSlider();
          this.collectionDescription = '';
          this.collectionSymbol = '';
          this.collectionShortUrl = '';
          this.isCreateProject = false;
          this.selectedNft = this.availableProjectsList.length
          this.getProjects();
        }
      }, (err: any) => {
        console.log('collectionStatusError ', err);
        this.isCollectionLoader =  false;
        clearInterval(interval);
      })
    }, 10000)
  }

  uploadCsv(event: any) {
    this.isLoading = true;
    if (!this.selectedProject) {
      this.cs.showError('Please select project');
      this.isLoading = false;
      return;
    }
    let fileData: any;
    if (event.target) {
      fileData = event.target.files[0];
    }
    let uploadedFile: any = new FormData();
    uploadedFile.append('file', fileData);
    console.log(event);
    let perms = {
      nft_id: this.selectedProject,
    };
    this.httpService.submitFormData(uploadedFile, perms).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.cs.showSuccess(res.message, 'Success');
        this.getProjects();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  uploadCsvOrTextFile(event: any) {
    console.log(event);
    if (this.giftedNfts >= this.nftLimit) {
      this.cs.showError('You limit of gifting nft exceeds', 'Error');
      return
    }
    this.files = [];
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[i]);
    }
    let perms = {
      nft_id: this.selectedProject,
    };
    this.httpService.submitFormData(formData, perms).subscribe({
      next: (res: any) => {
        console.log(res);
        this.files = [];
        this.isLoading = false;
        this.cs.showSuccess(res.message, 'Success');
        this.getProjects();
        this.isUploadedGiftNft = true;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  singleUploadEmail() {
    this.isLoading = true;
    if (!this.selectedProject) {
      this.cs.showError('Please select project');
      this.isLoading = false;
      return;
    }
    let emails = this.singleTransferForm.value;
    if (this.giftedNfts >= this.nftLimit) {
      this.cs.showError('You limit of gifting nft exceeds', 'Error');
      this.isLoading = false;
      return
    }
    let emailArray = Object.keys(emails)
      .map((key: string) => emails[key])
      .filter((email: any) => email?.length > 6);
    if (emailArray && emailArray.length >= 1) {
      console.log(emailArray);
      let payload = {
        emails: emailArray,
        nft_id: this.selectedProject,
      };
      this.httpService
        .httpRequest('post', 'gift/nft-by-email', payload)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.isLoading = false;
            this.cs.showSuccess(res.message, 'Success');
            this.singleTransferForm.reset();
            this.getProjects();
            this.isUploadedGiftNft = true;
            if (res.rejected_emails.length >= 1) {
              this.cs.showError('Some emails are rejected', '');
            }
          },
          (err: any) => {
            this.isLoading = false;
          }
        );
    } else {
      this.isLoading = false;

      this.cs.showError('Please Enter Email Address', 'ERROR');
    }
  }
  addNftToProject(project: any) {
    if (project.is_nft_added) {
      this.selectedProject = project.nft[0]._id;
      this.nftCreateForm.patchValue({
        collection: project._id
      })
      this.selectedCollection = project._id
    } else {
      this.selectedCollection = project._id
      this.nftCreateForm.patchValue({
        collection: project._id
      })
      this.isCreateProject = false;
      this.tabContentShow = 5;
      this.GiftCustSlider();
    }
  }

  getProjects() {
    this.httpService
      .httpRequest('get', 'nft/collections')
      .subscribe((res: any) => {
        console.log('nft Projects', res);
        this.availableProjectsList = res.collections;
        this.totalAvailableNfts = res.total_available_nfts;
        this.giftedNfts = res.gifted_nft_count;
        this.nftLimit = res.nft_limit
        this.customOptions.loop =
          this.availableProjectsList.length >= 3 ? true : false;
        this.custom2Options.loop = this.customOptions.loop;
        if (this.availableProjectsList.length >= 3) {
          this.customOptions.responsive = this.responsiveSlider;
          this.custom2Options.responsive = this.responsiveSlider;

        }
      });
  }

  getProfileDetail() {
    const getProfileSubscription = this.httpService
      .getProfileDetail()
      .subscribe((res: any) => {
        this.profileDetail = res;
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
    let path = location.origin + '/partners/' + id;
    this.copy(path);
  }

  copy(val: string) {
    navigator.clipboard.writeText(val);
    this.cs.showSuccess('Copied to clipboard.', '');
  }
  sharemailUrl(id: string) {
    let url = location.origin + '/partners/' + id;
    window.open(
      'mailto:?subject=' +
      encodeURIComponent(document.title) +
      '&body=' +
      encodeURIComponent(url)
    );
  }
  shareinstaUrl(id: string) {
    let url = location.origin + '/partners/' + id;
    window.open(
      'https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' +
      encodeURIComponent(document.title) +
      ':%20 ' +
      encodeURIComponent(url + 'add custom text here')
    );
  }
  sharefacebookUrl(id: string) {
    let url = location.origin + '/partners/' + id;
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
    );
  }
  openLink(url: any) {
    window.open(url)
  }


  // uploadCollectionImage(event:any){
  //   this.isCollectionImgUploading=true;
  //   this.collectionImagefiles=[];
  //   this.collectionImagefiles.push(event.addedFiles[0]);
  //   let formData: FormData = new FormData();
  //   formData.append('file', this.collectionImagefiles[0]);
  //   this.httpService.uploadImage(formData).subscribe((res: any) => {
  //     this.isCollectionImgUploading=false;
  //     console.log(res);
  //     this.cs.showSuccess(res.message, 'Success');
  //     this.collectionImg = res.filename;
  //   });
  // }
  get f() {
    return this.nftCreateForm?.['controls'];
  }
  createNftPartnerForm() {
    this.nftCreateForm = this.fb.group({
      file: '',
      name: ['', Validators.required],
      description: [''],
      collection: [this.selectedProjectUserId ? this.selectedProjectUserId : '', Validators.required],
      multipleCopies: ['', Validators.required],
      royalties: ['', Validators.required],
      isExtaContent: [true, Validators.required],
      isAcknowledged: [false, Validators.required],
    });
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  upload(event: any) {

    let file = event.addedFiles[0];
    this.nftUploadedFiles = [];
    this.nftUploadedFiles.push(file);
    // let file = <File>event.target.files[0];
    if (file) {
      let fileSize = file.size / 1048576;
      if (fileSize > 100) {
        this.cs.showError('File exceeds the maximum size 100MB ');
        this.nftCreateForm.value.file = '';
        return;
      }
      const formData: FormData = new FormData();
      formData.append('file', file);
      if (file.type.indexOf('video') > -1) {
        this.mediaType = 'video';
      }
      if (file.type.indexOf('image') > -1) {
        this.mediaType = 'image';
      }
      if (file.type.indexOf('audio') > -1) {
        this.mediaType = 'audio';
      }
      // this.localUrl = URL.createObjectURL(file);
      this.httpService
        .httpRequest('post', 'pin-image-to-ipfs', formData, true)
        .subscribe((res: any) => {
          this.fileData = 'https://nftwist.infura-ipfs.io/ipfs/' + res.added.path;
          this.uploading = false;
        });
    }
  }
  async submitForm() {
    console.log(this.nftCreateForm);

    this.isLoading = true;
    this.isSubmited = true;

    if (!this.fileData) {
      this.cs.showError('Please choose file for NFT', 'Error');
      this.isLoading = false;
      return
    }
    if (!this.selectedCollection) {
      this.cs.showError('Please select project');
      this.isLoading = false;
      return;
    }

    if (this.nftCreateForm.invalid) {
      this.cs.showError('Please fill all required fields', 'Error');
      this.isLoading = false;
      return
    }
    if (!this.nftCreateForm.value.isAcknowledged) {
      // this.cs.showError('Please fill all required fields', 'Error');
      this.isLoading = false;
      return
    }
    let payload = this.nftCreateForm.value;

    console.log(payload);
    payload.file = this.fileData;
    console.log(payload);
    let nftPayload = this.makePayloadData(payload);
    this.nftPayload = nftPayload;
    if (this.isLazyMinting) {
      this.CreateNft(nftPayload);
    } else {
      let gasFeeData: any = await this.getGasFee(nftPayload);
      this.gasFee = gasFeeData.transaction_fee;
      nftPayload.ipfs = gasFeeData.ipfs;
      this.nftPayload = nftPayload;
      this.CreateNft(nftPayload);
    }
  }
  async getGasFee(data: any) {
    let gasFeeData = await firstValueFrom(
      this.httpService.httpRequest('post', 'nft/estimate-gas-fee', data)
    );
    return gasFeeData;
  }

  async CreateNft(data: any) {
    this.isCreatingNft = true;
    this.httpService.httpRequest('post', 'nft', data).subscribe((resp: any) => {
      this.checkHash(resp.txn_id)
    }, (err: any) => {
      console.log('checkHashError ', err);
      this.isCreatingNft = false;
      this.isLoading = false;
    })
  }

  checkHash(trans_id: string) {
    let payload = {
      txn_id: trans_id
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-hash', payload).subscribe((res: any) => {
        if (res.txn_hash != null) {
          this.checkStatusOfHash(res.txn_hash)
          clearInterval(interval);
        }
      }, (err: any) => {
        console.log('checkHashError ', err);
        clearInterval(interval);
        this.isCreatingNft = false;
        this.isLoading = false;
      })
    }, 3000)
  }

  checkStatusOfHash(tnxHash: string) {
    let payload = {
      txn_hash: tnxHash,
      type: 2
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-status', payload).subscribe((resp: any) => {
        if (resp.status == 'SUCCEEDED') {
          clearInterval(interval);
          this.cs.showSuccess('NFT Created Succesfully');
          this.isLoading = false;
          this.cs.navigate('/home');
        }
      }, (err: any) => {
        console.log('collectionStatusError ', err);
        this.isLoading = false;
        clearInterval(interval);
      })
    }, 5000)
  }

  makePayloadData(data: any) {
    let paload: any = {
      collection_id: data.collection,
      category_id: '',
      name: data.name,
      description: data.description,
      token_id: '',
      auction_id: '',
      signed: '',
      is_lazy_mint: this.isLazyMinting ? 1 : 0,
      is_market_place: data.putOnMarketplace ? 1 : 0,
      type: 2,
      file: data.file,
      price: data.price,
      media_type: this.mediaType,
      owner_wallet_address: this.accountNumber,
      voucher: {},
      is_auction_window: data.is_auction_window,
    };
    if (data.is_auction_window) {
      paload.auction_time = data.auction_time;
    }
    return paload;
  }
  hideModal() {
    this.modeRef.close();
    this.isLoading = false;
    this.isCreatingNft = false;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    if (this.profileDetail.user_type == 2) {
      this.el.nativeElement.parentElement.classList.remove('partner');
    }
  }
}
