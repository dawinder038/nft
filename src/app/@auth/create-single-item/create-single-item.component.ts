import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Web3Service } from '../../@core/services/web3.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../@core/services/common.service';
import { GenericHttpService } from '../../@core/services/generic-http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, map, Subscription, throwError } from 'rxjs';
import { delay, retryWhen, tap } from 'rxjs/operators';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-single-item',
  templateUrl: './create-single-item.component.html',
  styleUrls: ['./create-single-item.component.scss'],
})
export class CreateSingleItemComponent implements OnInit, OnDestroy {
  @ViewChild('gasFeeModal') gasFeeModal: any;
  @ViewChild('uploadNftFileElement') uploadNftFileElement: any;

  walletAddress: string = '';
  nftCreateForm!: FormGroup;
  localUrl: any;
  mediaType: any;
  fileData: any;
  spinner: any;
  uploading: any;
  accountNumber: string = '';
  ERC721Contract: any;
  lazyNft721Contract: any;
  balance: any;
  mintId: any;
  isLazyMinting: boolean = false;
  subscriptions: Array<Subscription> = [];
  testVoucher = {
    tokenId: 1,
  };
  isLoading: boolean = false;
  userDetail: any;
  modeRef: any;
  modalOptions!: NgbModalOptions;
  gasFee: any;
  nftPayload: any = {};
  bnbValue: any;
  isCreatingNft: boolean = false;
  isSubmitted: boolean = false;
  availableCollectionList: any = [];
  isCollectionImgUploading: boolean = false;
  collectionImagefiles: any = [];
  collectionImg: any = [];
  collectionName: any = '';
  commissionFee = 1.99;
  collectionSybol: any;
  collectionShortUrl: any = '';
  collectionDescription: any;
  createNftResponse: any = '';
  constructor(private web: Web3Service, private modalService: NgbModal, private fb: FormBuilder, private cs: CommonService, private httpService: GenericHttpService, private sanitizer: DomSanitizer, private el: ElementRef) {
    this.getProjects();
    this.createNftForm();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'md',
    };
  }

  getProjects() {
    let payload = {
      type: 1
    }
    this.httpService.httpRequest('get', 'nft/collections', payload).subscribe((res: any) => {
      console.log('nft Projects', res);
      this.availableCollectionList = res.collections;
    });
  }
  ngOnInit(): void {
    this.userDetail = this.cs.getParsedLocalStorageData('user');
    let walletAddresSubscription = this.web.walletaddress.subscribe(
      (res: string) => {
        if (res && this.walletAddress != res) {
          this.walletAddress = res;
          this.accountNumber = res;
        }
      }
    );
    this.subscriptions.push(walletAddresSubscription);
    const bnbValueSubscription = this.web.BNB_VALUE.subscribe((res: any) => {
      this.bnbValue = res;
    });
    this.subscriptions.push(bnbValueSubscription);
  }

  /** Here Start Create NFT Logic */
  /** ====================================================================================================================================================================== */
  
  createNftForm() {
    this.nftCreateForm = this.fb.group({
      file: '',
      putOnMarketplace: true,
      price: ['', Validators.required],
      isExtaContent: true,
      extraContent: '',
      name: ['', Validators.required],
      description: '',
      collection: ['', Validators.required],
      royalties: ['', Validators.required],
      alternativeText: '',
      is_acknowledged: [false, Validators.required],
      is_auction_window: [true, Validators.required],
      auction_time: [''],
      properties: this.fb.array([
        this.fb.group({
          key: [''],
          value: [''],
        }),
        this.fb.group({
          key: [''],
          value: [''],
        })
      ]),
    });
  }

  get propertyFormArray() {
    return this.nftCreateForm.get('properties') as FormArray;
  }

  changeLazy(event: any) {
    this.isLazyMinting = event.target.checked;
  }

  addPropertyField() {
    const control = <FormArray>this.nftCreateForm.controls['properties'];
    control.push(this.createFormGroup());
  }

  createFormGroup() {
    return this.fb.group({
      key: [''],
      value: [''],
    });
  }

  async submitForm() {
    console.log('test', this.nftCreateForm.value);
    this.isSubmitted = true;

    if (!this.fileData) {
      this.scrollToFirstInvalidControl(true);
      this.cs.showError('Please choose file for NFT', 'Error');
      this.isLoading = false;
      return;
    }

    if (this.nftCreateForm.invalid) {
      this.cs.showError('Please fill all required fields', 'Error');
      this.isLoading = false;
      this.nftCreateForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return;
    }

    let payload = this.nftCreateForm.value;
    if (!payload.is_acknowledged) {
      this.cs.showError('Please acknowledged', 'Error');
      this.isLoading = false;
      return;
    }
    
    this.isCreatingNft = true;
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
          this.createNftResponse = '';
          this.cs.showSuccess('NFT Created Succesfully');
          this.isCreatingNft = false;
          this.cs.navigate('/home');
        }
      }, (err: any) => {
        console.log('collectionStatusError ', err);
        this.isCreatingNft = false;
        clearInterval(interval);
      })
    }, 5000)
  }

  makePayloadData(data: any) {
    data.properties = data.properties.filter(
      (property: any) => !!property.key && !!property.value
    );
    console.log(data.properties);

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
      type: 1,
      file: data.file,
      price: data.price,
      royalty: data.royalties,
      no_of_copy: data.multipleCopies,
      media_type: this.mediaType,
      owner_wallet_address: this.accountNumber,
      voucher: {},
      properties: data.properties,
      alternative_description: data.alternativeText,
      is_auction_window: data.is_auction_window,
    };
    if (data.is_auction_window) {
      paload.auction_time = data.auction_time;
    }
    if (data.isExtaContent) {
      paload.extra_content = data.extraContent;
      paload.unlockable_content = data.extraContent;
    }
    return paload;
  }

  upload(event: any) {
    let file = event.addedFiles[0];
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
        this.mediaType = 'vedio';
      }
      if (file.type.indexOf('image') > -1) {
        this.mediaType = 'image';
      }
      if (file.type.indexOf('audio') > -1) {
        this.mediaType = 'audio';
      }
      this.localUrl = URL.createObjectURL(file);
      this.httpService
        .httpRequest('post', 'pin-image-to-ipfs', formData, true).subscribe((res: any) => {
          this.fileData = 'https://nftwist.infura-ipfs.io/ipfs/' + res.added.path;
          this.uploading = false;
        });
    }
  }

  /** Here Endup Create NFT Logic */
  /** ====================================================================================================================================================================== */

  /** Here Start Create Collection Logic */
  /** ====================================================================================================================================================================== */

  uploadCollectionImage(event: any) {
    this.isCollectionImgUploading = true;
    this.collectionImagefiles = [];
    this.collectionImagefiles.push(event.addedFiles[0]);
    let formData: FormData = new FormData();
    formData.append('file', this.collectionImagefiles[0]);
    this.httpService.httpRequest('post', 'pin-image-to-ipfs', formData, true).subscribe((res: any) => {
      this.isCollectionImgUploading = false;
      this.cs.showSuccess(res.message, 'Success');
      this.collectionImg = 'https://nftwist.infura-ipfs.io/ipfs/' + res.added.path;
    });
  }

  isCollectionCreating: boolean = false;
  createCollection(closeBtn: HTMLElement) {
    let payload = {
      name: this.collectionName,
      image: this.collectionImg,
      type: 1,
      symbol: this.collectionSybol,
      description: this.collectionDescription,
      short_url: 'nftwist.io/' + this.collectionShortUrl,
    };
    if (!payload.name) {
      this.cs.showError('Please Enter Collection Name', 'Error');
      return;
    }
    if (this.collectionImg.length == 0) {
      this.cs.showError('Please Select Collection Image', 'Error');
      return;
    }
    if (!payload.symbol) {
      this.cs.showError('Please Enter Collection Sybole', 'Error');
      return;
    }
    if (!payload.description) {
      this.cs.showError('Please Enter Collection description', 'Error');
      return;
    }
    this.isCollectionCreating = true;
    this.httpService.httpRequest('post', 'nft/collection', payload).subscribe((resp: any) => {
      this.checkTransactionHash(resp.data.txn_id, closeBtn, resp);
    }, (err: any) => {
      console.log('collection_create', err);
      this.isCollectionCreating = false;
    })
  }

  checkTransactionHash(trans_id: string, closeBtn: HTMLElement, resp: any) {
    let payload = {
      txn_id: trans_id
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-hash', payload).subscribe((res: any) => {
        if (res.txn_hash != null) {
          this.checkStatusOfCollection(res.txn_hash, closeBtn, resp);
          clearInterval(interval);
        }
      }, (err: any) => {
        console.log('checkHashError ', err);
        this.isCollectionCreating = false;
        clearInterval(interval);
      })
    }, 3000)

  }

  checkStatusOfCollection(tnxHash: any, closeBtn: HTMLElement, res: any) {
    let payload = {
      txn_hash: tnxHash,
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'collection/txn-status', payload).subscribe((resp: any) => {
        if (resp.status == 'SUCCEEDED') {
          this.approveCollection(resp, closeBtn);
          clearInterval(interval);
        }
      }, (err: any) => {
        console.log('collectionStatusError ', err);
        this.isCollectionCreating = false;
        clearInterval(interval);
      })
    }, 20000)
  }

  approveCollection(res: any, closeBtn: HTMLElement) {
    let payload = {
      collection_address: res.collection_address
    }
    this.httpService.httpRequest('post', 'nft/approve/owner', payload).subscribe((resp: any) => {
      this.checkStatusOfApproval(closeBtn, res.collection_address)
    }, (err: any) => {
      console.log('approveCollectionError ', err);
      this.isCollectionCreating = false;
    })
  }

  checkStatusOfApproval(closeBtn: HTMLElement, collectionAddress: any) {
    let payload = {
      collection_address: collectionAddress
    }
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'nft/owner/approval', payload).subscribe((res: any) => {
        if (res.result[0].value === true) {
          clearInterval(interval)
          this.isCollectionCreating = false;
          this.resetCollectionModalData();
          this.cs.showSuccess("Collection Created Successfully", "Success");
          this.getProjects();
          setTimeout(() => {
            closeBtn.click();
          }, 2000);
        }
      }, (err: any) => {
        console.log('statusApprovalError ', err);
        this.isCollectionCreating = false;
        clearInterval(interval);
      })
    }, 20000)
  }

  resetCollectionModalData() {
    this.collectionName = '';
    this.collectionImg = '';
    this.collectionImagefiles = [];
  }

  /** ====================================================================================================================================================================== */
  /** Here Endup Create Collection Logic */

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  get f() {
    return this.nftCreateForm?.['controls'];
  }
  hideModal() {
    this.modeRef.close();
    this.isLoading = false;
    this.isCreatingNft = false;
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  private scrollToFirstInvalidControl(isUploadError = false) {
    console.log(this.uploadNftFileElement);

    const firstInvalidControl: HTMLElement = isUploadError
      ? this.uploadNftFileElement._fileInput.nativeElement
      : this.el.nativeElement.querySelector('form .ng-invalid');

    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: 'smooth',
    });
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
  async checkStatusOfTxn(txnHash: any) {
    let payload = {
      txn_hash: txnHash,
    };
    let res = await firstValueFrom(
      this.httpService.httpRequest('get', 'txn-status', payload).pipe(
        map((status: any) => {
          if (status.status != 'SUCCEEDED' && status.status != 'FAILED')
            throw new Error('Invalid Value');
          if (status.status == 'FAILED') {
            return false;
          }
          return true;
        }),
        retryWhen((err: any) => {
          console.log(err);
          err.pipe(
            tap(() => console.log('error occurred, txn not Approved', err)),
            delay(4000),
            tap(() => console.log('Retrying ...'))
          );
          return err;
        })
      )
    )
      .then((res) => {
        console.log('txn res=>>', res);
        return res;
      })
      .catch((err: any) => {
        console.log('txn error===>', err);
        return false;
      });
    return res;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
