import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Web3Service } from '../../@core/services/web3.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericHttpService } from '../../@core/services/generic-http.service';
import { CommonService } from '../../@core/services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftDetailComponent implements OnInit {
  isLoaded: boolean = false;
  commentForm!: FormGroup;
  constructor(private cs: CommonService, private httpService: GenericHttpService, private route: ActivatedRoute, private cd: ChangeDetectorRef, private router: Router, private web3Service: Web3Service) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 3,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  baseImgUrl: string = this.httpService.originalImgUrl;
  nftId: any = '';
  isShow: boolean = false;
  nftDetail: any = {};
  nftCommentText: any = '';
  isRplyingId: any = '';
  isByTemsChecked: boolean = false;
  walletBallance: any = 0;
  isLogedIn: boolean = false;
  isBuying: boolean = false;
  copiesToBuy: any = 1;
  selectedBuyDetail: any = {};
  selecteedNftOwnerAddress: any = '';
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.nftId = res.id;
      this.getNftDetail();
    });
    let userSession = localStorage.getItem('user-session');
    if (userSession) {
      this.isLogedIn = true;
      this.web3Service.walletBallance.subscribe((res: any) => {
        this.walletBallance = res;
      });
    }
    this.InitializeCommentForm();
      this.getMarketPlaceNfts();
  }

   /** ======= Get All NFTs ================  */
  
   marketPlaceNfts: any = [];
   getMarketPlaceNfts() {
     this.httpService.httpRequest('get', 'nfts').subscribe((res: any) => {
       this.marketPlaceNfts = res[0].data;
       this.cd.detectChanges();
     });
   }

  SendNFT() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);
  }

  InitializeCommentForm() {
    this.commentForm = new FormGroup({
      id: new FormControl(''),
      comment: new FormControl('', [Validators.required])
    })
  }

  getNftDetail() {
    let payload = {
      nft_id: this.nftId,
    };
    this.httpService.httpRequest('get', 'nft', payload).subscribe((res: any) => {
        console.log(res);
        this.nftDetail = res;
        this.selectedBuyDetail = this.nftDetail;
        this.selecteedNftOwnerAddress = this.nftDetail.current_owner?.wallet_address;
        this.cd.detectChanges();
      });
  }

  msToHMS(ms: any) {
    ms = Number(ms);
    ms = new Date().getTime() - new Date(ms).getTime();
    ms = Number(ms);
    let seconds: any = ms / 1000;
    const day: any = parseInt((seconds / 86400).toString());
    seconds = seconds % 86400;
    const hours: any = parseInt((seconds / 3600).toString());
    seconds = seconds % 3600;
    const minutes: any = parseInt((seconds / 60).toString());
    seconds = parseInt((seconds % 60).toString());
    console.log(hours, minutes, seconds);
    let time = '' + (day ? day + 'Day ' : '').toString() + (hours ? hours + ' hour' : '').toString() + ' ' + (minutes ? minutes + ' minutes' : '').toString(); 
    return time;
  }

  makeComment() {
    let payload = {
      comment: this.commentForm.controls['comment'].value,
      nft_id: this.nftId,
    };
    if (!this.isLogedIn) {
      return;
    }
    this.httpService
      .httpRequest('post', 'nft/comment', payload)
      .subscribe((res: any) => {
        this.getNftDetail();
        console.log(res);
        this.cs.showSuccess(res.message, 'Success');
        this.commentForm.controls['comment'].patchValue('');
      });
  }

  deleteComment(commentId: any) {
    let payload = {
      comment_id: commentId,
    };
    this.httpService
      .httpRequest('delete', 'nft/comment', payload)
      .subscribe((res: any) => {
        this.getNftDetail();
        this.cs.showSuccess(res.message, 'Success');
      });
  }

  likeComment(id: any) {
    let payload = {
      comment_id: id,
    };
    this.httpService
      .httpRequest('post', 'nft/comment/like', payload)
      .subscribe((res: any) => {
        this.cs.showSuccess(res.message, 'Success');
      });
  }

  likeReplyComment(id: any) {
    let payload = {
      comment_reply_id: id,
    };
    this.httpService
      .httpRequest('post', 'nft/comment-reply/like', payload)
      .subscribe((res: any) => {
        this.cs.showSuccess(res.message, 'Success');
      });
  }

  repyComment(id: any, event: any) {
    console.log(event);

    if (event.target.value) {
      let payload = {
        comment_id: id,
        comment: event.target.value,
      };
      this.httpService
        .httpRequest('post', 'nft/comment/reply', payload)
        .subscribe((res: any) => {
          this.cs.showSuccess(res.message, 'Success');
          this.getNftDetail();
          this.isRplyingId = '';
        });
    }
  }
  changeFollow(userId: any) {
    let payload = {
      user_id: userId,
    };
    this.httpService
      .httpRequest('post', 'user/follow', payload)
      .subscribe((res: any) => {
        console.log(res);
        this.cs.showSuccess(res.message);
        this.getNftDetail();
      });
  }

  likeUnlikeNft(id: any) {
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
  shareBYCopy(id: string) {
    // let path=location.origin +'/user-profile/'+id;
    let path = location.href;
    this.copy(path);
  }

  copy(val: string) {
    navigator.clipboard.writeText(val);
    this.cs.showSuccess('Copied to clipboard.', '');
  }
  sharemailUrl(id: string) {
    let url = location.href;
    window.open(
      'mailto:?subject=' +
      encodeURIComponent(document.title) +
      '&body=' +
      encodeURIComponent(url)
    );
  }
  shareinstaUrl(id: string) {
    let url = location.href;
    window.open(
      'https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' +
      encodeURIComponent(document.title) +
      ':%20 ' +
      encodeURIComponent(url + 'add custom text here')
    );
  }
  sharefacebookUrl(id: string) {
    let url = location.href;
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
    );
  }

  /** Start Buy NFT Logic */
  /** ==================================================================================================================== */

  BuyNow(closebuyModal: HTMLElement) {
    if (this.isBuying) {
      return;
    }
    this.isBuying = true;
    console.log(this.nftDetail.price);

    let payload: any = {
      amount: this.nftDetail.price,
      quantity: 1
    };

    if (this.nftDetail.type == 1) {
      payload.owner_id = this.selectedBuyDetail.current_owner._id;
      payload.nft_resell_id = this.selectedBuyDetail.current_owner.nft_resell_id;
    }

    if (this.nftDetail.type == 2) {
      payload.quantity = Number(this.copiesToBuy);
      if (this.nftDetail == this.selectedBuyDetail) {
        payload.owner_id = this.selectedBuyDetail.current_owner._id;
        payload.nft_resell_id = this.selectedBuyDetail.current_owner.nft_resell_id;
      } else {
        payload.owner_id = this.selectedBuyDetail.reseller_id._id;
        payload.nft_resell_id = this.selectedBuyDetail._id;
      }
    }
    this.depositEthToWeth(payload, closebuyModal)
  }

  depositEthToWeth(payload: any, closebuyModal: HTMLElement) {
    this.httpService.httpRequest('post', 'nft/deposit/eth_to_weth', payload).subscribe((depositResp: any) => {
      if (depositResp?.error_description == 'Insufficient funds for gas * price + value') {
        this.isBuying = false;
        this.cs.showError('Insufficient funds for gas * price + value', 'Error');
        return;
      } else {
        let payload = {
          txn_hash: depositResp.result.transactionHash,
        };
        var interval = setInterval(() => {
          this.httpService.httpRequest('get', 'txn-status', payload).subscribe((response: any) => {
            if(response.status == 'SUCCEEDED') {
              clearInterval(interval);
              this.approveDepositWeth(closebuyModal);
            }
          },(error: any) => {
            this.isBuying = false;
            this.cs.showError(error.error_description, 'Error');
            return;
          })
        }, 5000)
      }
    }, (error: any) => {
      if (error?.error_description == 'Insufficient funds for gas * price + value') {
        this.isBuying = false;
        this.cs.showError('Insufficient funds for gas * price + value', 'Error');
        return;
      }
    })
  }

  approveDepositWeth(closebuyModal: HTMLElement) {
    let payload = {
      amount: this.nftDetail.price,
      quantity: this.copiesToBuy
    }
    this.httpService.httpRequest('post', 'nft/approve/weth', payload).subscribe((approveResp: any) => {
      if(approveResp) {
        let payload = {
          txn_hash: approveResp.result.transactionHash,
        };
        var interval = setInterval(() => {
          this.httpService.httpRequest('get', 'txn-status', payload).subscribe((response: any) => {
            if(response.status == 'SUCCEEDED') {
              clearInterval(interval);
              this.buyNFT(closebuyModal);
            }
          },(error: any) => {
            this.isBuying = false;
            this.cs.showError(error.error_description, 'Error');
            return;
          })
        }, 5000)
      }
    }, (error: any) => {
        this.isBuying = false;
        this.cs.showError(error.error_description, 'Error');
        return;
      })
  }

  buyNFT(closebuyModal: HTMLElement) {
    let buyNftPayload: any = {
      nft_id: this.nftDetail._id,
      quantity: 1,
    };
    if (this.nftDetail.type == 2) {
      buyNftPayload.quantity = Number(this.copiesToBuy);
    }
    if (this.nftDetail == this.selectedBuyDetail) {
      buyNftPayload.owner_id = this.selectedBuyDetail.current_owner._id;
      buyNftPayload.nft_resell_id = this.selectedBuyDetail.current_owner.nft_resell_id;
    } else {
      buyNftPayload.owner_id = this.selectedBuyDetail.reseller_id._id;
      buyNftPayload.nft_resell_id = this.selectedBuyDetail._id;
    }
    this.httpService.httpRequest('post', 'nft/buy', buyNftPayload).subscribe((response: any) => {
      if(response) {
        this.getTransactionHashByTransactionId(response.txn_id, closebuyModal)
      }
    },(error: any) => {
      this.isBuying = false;
      this.cs.showError(error.error_description, 'Error');
      return;
    })
  }

  getTransactionHashByTransactionId(transactionId: string, closebuyModal: HTMLElement) {
    let payload = {
      txn_id: transactionId,
      type: 3
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-hash', payload).subscribe((response: any) => {
        if(response.txn_hash != null) {
          this.checkTransactionHash(response.txn_hash, closebuyModal)
          clearInterval(interval)
        }
      },(error: any) => {
        this.isBuying = false;
        this.cs.showError(error.error_description, 'Error');
        clearInterval(interval)
        return;
      })
    }, 3000)
  }

  checkTransactionHash(transactionHash: string, closebuyModal: HTMLElement) {
    let payload = {
      txn_hash: transactionHash,
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-status', payload).subscribe((response: any) => {
        if(response.status == 'SUCCEEDED') {
          clearInterval(interval);
          this.isBuying = false;
          this.cs.showSuccess("NFT buy successfully", "Success");
          closebuyModal.click();
          this.getNftDetail();
        }
      },(error: any) => {
        this.isBuying = false;
        this.cs.showError(error.error_description, 'Error');
        return;
      })
    }, 5000)
  }

  /** Endup Buy NFT Logic */
  /** ==================================================================================================================== */
 

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberOnlyLimited(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    let p = this.copiesToBuy ? (this.copiesToBuy.toString() + event.key) : event.key;
    if (p > this.selectedBuyDetail.available) {
      this.cs.showError('copies can not be greater then available', 'Success')
      return false
    }
    return true;
  }
  is_Resale: String = '';
  buyResaledNft(reselerDetail: any) {
    this.is_Resale = "resale"
    this.selectedBuyDetail = reselerDetail;
    this.selecteedNftOwnerAddress = this.nftDetail.current_owner?.owner_address;
  }

  buyNftFromMain() {
    this.is_Resale = "main"
    this.selectedBuyDetail = this.nftDetail;
    this.selecteedNftOwnerAddress = this.nftDetail.current_owner?.wallet_address;
  }
  
  reportNft(clsBtn: HTMLElement) {
    let payload = {
      nft_id: this.nftId
    }
    this.httpService.httpRequest('post', 'nft/report', payload).subscribe((response: any) => {
      this.cs.showSuccess("NFT Report Successfully", "Success");
      clsBtn.click();
    })
  }

  copiesAddress(address: string) {
    window.navigator.clipboard.writeText(address);
    this.cs.showSuccess("Copied Address Successfully", "Success");
  }

  pasteAddress(address: string) {
    window.navigator.clipboard.writeText(address);
    this.cs.showSuccess("Paste Address Successfully", "Success");
  }

  likeUnlike(id: any, event: Event) {
    event.stopPropagation()
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

  /** Edit Post Comment */

  isEdit: boolean = false;
  editCommentResponse: any;

  getCommentById(id: String) {
    this.isEdit = true;
    let payload = {
      nft_comment_id: id
    }
    this.httpService.httpRequest('get', 'nft/comment', payload).subscribe((resp: any) => {
      this.editCommentResponse = resp;
      this.commentForm.controls['comment'].patchValue(resp.comment);
    })
  }

  editComment() {
    let payload = {
      id: this.editCommentResponse._id,
      comment: this.commentForm.controls['comment'].value
    }
    this.httpService.httpRequest('put', 'nft/comment', payload).subscribe((resp: any) => {
      this.getNftDetail();
      this.cs.showSuccess(resp.message, 'Success');
      this.commentForm.controls['comment'].patchValue('');
      this.isEdit = false;
    })
  }

  goNftDetailPage(nftData: any) {
    if(!this.isLogedIn) {
      this.cs.showError("Please must be login first!");
      this.router.navigateByUrl('/nft-details/' + nftData._id);
    } else {
      this.router.navigateByUrl('/nft-details/' + nftData._id);
    }
  }

  ResaleNft(closebuyModal: HTMLElement) {
    this.isBuying = true
    let payload = {
      nft_id: this.nftDetail._id,
      price:this.nftDetail.price,
      quantity: this.copiesToBuy, 
    }
    this.httpService.httpRequest('post', 'nft/post_nft_resell', payload).subscribe((resp: any) => {
      this.CheckTransactionHash(resp.data.txn_id, closebuyModal, resp);
    }, (err: any) => {
      console.log('collection_create', err);
      this.isBuying = false;
    })
  }

  CheckTransactionHash(trans_id: string, closeBtn: HTMLElement, resp: any) {
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
        clearInterval(interval);
        this.isBuying = false;
      })
    }, 3000)

  }

  checkStatusOfCollection(tnxHash: any, closeBtn: HTMLElement, res: any) {
    let payload = {
      txn_hash: tnxHash,
    };
    var interval = setInterval(() => {
      this.httpService.httpRequest('get', 'txn-status', payload).subscribe((resp: any) => {
        if (resp.status == 'SUCCEEDED') {
          this.approveCollection(resp, closeBtn);
          clearInterval(interval);
        }
      }, (err: any) => {
        console.log('collectionStatusError ', err);
        clearInterval(interval);
        this.isBuying = false;
      })
    }, 10000)
  }

  approveCollection(res: any, closeBtn: HTMLElement) {
    let payload = {
      collection_address: res.collection_address
    }
    this.httpService.httpRequest('post', 'nft/approve/owner', payload).subscribe((resp: any) => {
      this.checkStatusOfApproval(closeBtn, res.collection_address)
    }, (err: any) => {
      console.log('approveCollectionError ', err);
      this.isBuying = false;
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
          this.cs.showSuccess("NFT resale Successfully", "Success");
          this.nftDetail();
          closeBtn.click();
          this.isBuying = false;
        }
      }, (err: any) => {
        console.log('statusApprovalError ', err);
        clearInterval(interval);
        this.isBuying = false;
      })
    }, 10000)
  }
}
