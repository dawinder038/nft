import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { Web3Service } from 'src/app/@core/services/web3.service';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { delay, map, retry, retryWhen, tap } from 'rxjs/operators';
declare let window: any;

@Component({
  selector: 'app-create-collectible-item',
  templateUrl: './create-collectible-item.component.html',
  styleUrls: ['./create-collectible-item.component.scss'],
})
export class CreateCollectibleItemComponent implements OnInit {
  @ViewChild('gasFeeModal') gasFeeModal: any;
  @ViewChild('uploadNftFile') uploadNftFileElement: any;
  walletAddress: string = '';
  nftCreateForm!: FormGroup;
  localUrl: any;
  mediaType: any;
  fileData: any;
  spinner: any;
  uploading: any;
  accountNumber: any;
  ERC1155Contract: any;
  lazyNft721Contract: any;
  balance: any;
  mintId: any;
  isLazyMinting: boolean = false;
  nftType = 'ERC1155';
  subscriptions: Array<Subscription> = [];
  userType: any;
  availableProjectsList: any;
  selectedProjectUserId: any;
  isLoading: boolean = false;
  collectionImagefiles: any = [];
  collectionImg: any;
  collectionName: any;
  isCollectionImgUploading: boolean = false;
  bnbValue: any;
  gasFee: any;
  modeRef: any;
  modalOptions!: NgbModalOptions;
  nftPayload: any = {};
  isCreatingNft: boolean = false;
  isSubmitted: boolean = false;
  commissionFee: any = 1.99;
  collectionSybol: any;
  collectionShortUrl: any = '';
  collectionDescription: any;
  createNftResponse:any='';

  constructor(private web: Web3Service, private fb: FormBuilder, private cs: CommonService, private httpService: GenericHttpService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private location: Location, private modalService: NgbModal, private el: ElementRef) {
    this.modalOptions = { backdrop: 'static', backdropClass: 'customBackdrop', size: 'md'};
    this.userType = this.cs.getUserType();
    this.getProjects();

    if (this.userType == 1) {
      this.createNftForm();
    } 
    else {
      this.route.queryParams.subscribe((res: any) => {
        this.location.replaceState('/create-collectible-item');
        this.selectedProjectUserId = res.id;
        this.createNftPartnerForm();
      });
    }
  }

  ngOnInit(): void {
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
    this.subscriptions.push(walletAddresSubscription);
    const bnbValueSubscription = this.web.BNB_VALUE.subscribe((res: any) => {
      this.bnbValue = res;
    });
    this.subscriptions.push(bnbValueSubscription);
  }

  getProjects() {
    let payload={
      type:2
    }
    this.httpService.httpRequest('get', 'nft/collections',payload).subscribe((res: any) => {
      console.log('nft Projects', res);
      this.availableProjectsList = res.collections;
    });
  }

  /** Here Start Create NFT Logic */
  /** ====================================================================================================================================================================== */

  createNftPartnerForm() {
    this.nftCreateForm = this.fb.group({
      file: '',
      name: ['', Validators.required],
      description: ['', Validators.required],
      collection: [ this.selectedProjectUserId ? this.selectedProjectUserId : '', Validators.required],
      alternativeText: '',
      multipleCopies: ['', Validators.required],
      is_acknowledged: [false, Validators.required],
      isExtaContent: true,
      extraContent: '',
      properties: this.fb.array([
        this.fb.group({
          key: '',
          value: '',
        }),
        this.fb.group({
          key: '',
          value: '',
        }),
      ]),
    });
  }

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
      alternativeText: '',
      multipleCopies:[''],
      royalty: ['', Validators.required],
      is_acknowledged: [false, Validators.required],
      properties: this.fb.array([
        this.fb.group({
          key: '',
          value: '',
        }),
        this.fb.group({
          key: '',
          value: '',
        }),
      ]),
    });
  }

  get propertyFormArray() {
    return this.nftCreateForm.get('properties') as FormArray;
  }

  get f() {
    return this.nftCreateForm.controls;
  }

  changeLazy(event: any) {
    console.log(event);
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
    this.isLoading = true;
    this.isSubmitted = true;
    if (!this.fileData) {
      this.scrollToFirstInvalidControl(true);
      this.cs.showError('Please choose file for NFT', 'Error');
      this.isLoading = false;
      return;
    }

    if (this.nftCreateForm.invalid) {
      this.nftCreateForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      this.cs.showError('Please fill all required fields', 'Error');
      this.isLoading = false;
      return;
    }

    let payload = this.nftCreateForm.value;
    if (!payload.is_acknowledged) {
      this.cs.showError('Please acknowledged', 'Error');
      this.isLoading = false;
      return;
    }
    this.isCreatingNft = true;
    payload.file = this.fileData;
    payload.type = this.nftType;
    console.log(payload);
    let nftPayload: any = this.makePayloadData(payload);
    if (this.isLazyMinting) {
      this.CreateNft(nftPayload);
    } 
    else {
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
    data.properties = data.properties.filter((property: any) => !!property.key && !!property.value);
    if (this.userType == 1) {
      let paload = {
        collection_id: data.collection ? data.collection : null,
        category_id: '',
        name: data.name,
        description: data.description,
        token_id: '',
        auction_id: '',
        signed: '',
        is_lazy_mint: this.isLazyMinting ? 1 : 0,
        is_market_place: data.putOnMarketplace ? 1 : 0,
        type: 2,
        unlockable_content: data.extraContent,
        file: data.file,
        price: data.price,
        royalty: data.royalty,
        no_of_copy: data.multipleCopies,
        media_type: this.mediaType,
        owner_wallet_address: this.accountNumber,
        voucher: {},
        alternative_description: data.alternativeText,
        properties: data.properties,
      };
      return paload;
    } 
    else {
      let paload = {
        collection_id: data.collection,
        category_id: '',
        name: data.name,
        description: data.description,
        token_id: '',
        auction_id: '',
        signed: '',
        is_lazy_mint: 0,
        type: 2,
        unlockable_content: data.extraContent,
        file: data.file,
        no_of_copy: data.multipleCopies,
        media_type: this.mediaType,
        owner_wallet_address: this.accountNumber,
        voucher: {},
        alternative_description: data.alternativeText,
        properties: data.properties,
      };
      return paload;
    }
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
    this.httpService
      .httpRequest('post', 'pin-image-to-ipfs', formData, true)
      .subscribe((res: any) => {
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
      type: 2,
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
          },2000);
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

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  hideModal() {
    this.modeRef.close();
    this.isLoading = false;
    this.isCreatingNft = false;
  }

  private scrollToFirstInvalidControl(isUploadError = false) {
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
