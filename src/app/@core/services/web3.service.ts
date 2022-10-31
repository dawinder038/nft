import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import Web3 from "web3";
// const Web3 = require('web3');
// import * as Web3 from "web3";
declare let require: any;
declare let window: any;
// import Web3 from 'web3';
import { CommonService } from './common.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
const GenericERC721 = require('./../../../contracts/ERC721/ERC721.sol/GenericERC721.json');
const LazyNFTERC721 = require('./../../../contracts/ERC721/LazyMintERC721.sol/LazyNFTERC721.json');

const GenericERC1155 = require('./../../../contracts/ERC1155/ERC1155.sol/GenericERC1155.json');
const LazyNFTERC1155 = require('./../../../contracts/ERC1155/LazyMintERC1155.sol/LazyNFTERC1155.json');
const sigUtil = require('eth-sig-util')
const http = require('http');

// const ERC2981PerTokenRoyalties =require('./../../../contracts/ERC2981PerTokenRoyalties.sol/ERC2981PerTokenRoyalties.json');
// const GenericAccessControl =require('./../../../contracts/AccessControl.sol/GenericAccessControl.json');
const Web3 = require('web3');
var Web3HttpProvider = require('web3-providers-http');
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  messageResult: any = '';
  accountNumber: any = '';
  balance: any = '';
  walletBallance = new BehaviorSubject<any>(0);
  walletaddress = new BehaviorSubject<string>('');
  ERC_721_CONTRACT_ADDRESS = '0xb2cc813fAFDC73B3b0e876aF798A7E9c4C266973';
  MARKET_PLACE_ERC721_CONTRACT_ADDRESS = '';

  ERC1155_CONTRACT_ADDRESS = '0x74Fc71486A8317f4F6381a495B23AE25e301471d';
  MARKET_PLACE_ERC1155_CONTRACT_ADDRESS = '';
  // auctionERC1155ContractAddress='';
  // marketPlaceERC721: any = {};
  // nftErc721: any = {};
  BNB_VALUE: BehaviorSubject<any> = new BehaviorSubject(0);
  ERC721Contract: any;
  lazyNft721Contract: any;
  SIGNING_DOMAIN_NAME = 'LazyNFT-Voucher';
  SIGNING_DOMAIN_VERSION = '1';
  chainId = 97;
  _domain: any;
  ethNetwork = 'wss://rinkeby.infura.io/ws/v3/6c1395806f8b4f28a4062b6a39d8a2ee';
  userDetail: any;
  constructor(
    private cs: CommonService,
    private http: HttpClient,
    private httpServce: GenericHttpService
  ) {
    if (this.cs.isUserLogedIn()) {
      this.getBNBVAlueInDollers();
      this.getFundsValue();
    }

    this.cs.changeLoginObservable.subscribe((res: any) => {

      if (res) {
        this.userDetail = this.cs.getParsedLocalStorageData('user');
        // this.initializeWeb3WithWalletAddress(this.userDetail?.wallet_private_key);
      }

    })
    if (this.cs.getLocalStorageData('user-session')) {
      this.userDetail = this.cs.getParsedLocalStorageData('user');
      // this.initializeWeb3WithWalletAddress(this.userDetail?.wallet_private_key);
    }
    // this.checkWeb3_1();
  }


  msgParams = [
    {
      type: 'string',      // Any valid solidity type
      name: 'Message',     // Any string label you want
      value: 'Hi, Alice!'  // The value to sign
    },
    {
      type: 'uint32',
      name: 'A number',
      value: '1337'
    }
  ]
  async createVoucher(tokenId: any, uri: string, minPrice = 0) {
    const voucher = { tokenId, uri, minPrice };
    // const domain = await this._signingDomain();
    const types = {
      NFTVoucher: [
        { name: 'tokenId', type: 'uint256', value: tokenId },
        { name: 'minPrice', type: 'uint256', value: minPrice },
        { name: 'uri', type: 'string', value: uri },
      ],
    };
    const NFTVoucher = [
      { name: 'tokenId', type: 'uint256', value: tokenId },
      { name: 'minPrice', type: 'uint256', value: minPrice },
      { name: 'uri', type: 'string', value: uri },
    ]
    const NFTVoucher1 = [
      { tokenId: tokenId },
      { minPrice: minPrice },
      { uri: uri },
    ]
    // const signature = await this.signer._signTypedData(domain, types, voucher)
    // const signature = await window.ethereum.request({
    //   method: 'personal_sign',
    //   params: [NFTVoucher, this.accountNumber],
    // });
    // console.log(sigUtil);
    // const signature = await window.ethereum.request({
    //   method: 'personal_sign',
    //   params: [types.NFTVoucher, this.accountNumber],
    // });

    let from = this.accountNumber;
    let signature: any;
    await new Promise<void>((resolve: any, reject: any) => {

      let data = window.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [NFTVoucher, this.accountNumber],
        from: this.accountNumber,
      }, (err: any, result: any) => {
        console.log('sign result', result);

        // return result.result
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
        const recovered = sigUtil.recoverTypedSignature({
          data: NFTVoucher,
          sig: result.result
        })
        if (recovered.toUpperCase() === from.toUpperCase()) {
          // alert('Recovered signer: ' + from)
          signature = result.result
          resolve(result.result);
          // return result.result
        } else {
          // alert('Failed to verify signer, got: ' + result);
          signature = result.result
          resolve(result.result);
          // return result.result
        }
      })


    })
    // // const signature = await this.signMsg(NFTVoucher,this.accountNumber)


    // let { r, s, v } = this.getSignatureParameters(signature);
    return {
      ...voucher,
      signature,
    };
  }
  verifyVoucher(NFTVoucher: any, signature: any) {
    const recovered = sigUtil.recoverTypedSignature({
      data: NFTVoucher,
      sig: signature
    })
    console.log(recovered);

  }

  getSignatureParameters(signature: any) {
    // if (!ethers.utils.isHexString(signature)) {
    //   throw new Error(
    //     'Given value "'.concat(signature, '" is not a valid hex string.')
    //   )
    // }
    var r = signature.slice(0, 66)
    var s = '0x'.concat(signature.slice(66, 130))
    var v = '0x'.concat(signature.slice(130, 132))
    // v = ethers.BigNumber.from(v).toNumber()
    let vn = Number(v)

    if (![27, 28].includes(vn)) vn += 27

    console.log('Signature', signature)
    console.log('r', r)
    console.log('s', s)
    console.log('v', vn)

    return {
      r: r,
      s: s,
      v: vn,
    }
  }
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = this.chainId;
    this._domain = {
      name: this.SIGNING_DOMAIN_NAME,
      version: this.SIGNING_DOMAIN_VERSION,
      verifyingContract: this.ERC_721_CONTRACT_ADDRESS,
      chainId,
    };
    return this._domain;
  }
  // A JS library for recovering signatures:

  // Get the current account:
  // web3.eth.getAccounts(function (err, accounts) {
  //   if (!accounts) return
  //   signMsg(msgParams, accounts[0])
  // })
  async signMsg(msgParams: any, from: any = this.accountNumber) {
    console.log(sigUtil);

  }

  public checkAndInstantiateWeb3Old(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        resolve(this.messageResult);
      } else if (window.Web3) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.web3.currentProvider);
        // var web3 = new Web3(new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co'));
        resolve(this.messageResult);
      } else {
        // var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
        // window.web3=web3
        this.cs.showError(
          'No Binance Smart Chain browser detected. You should consider trying MetaMask',
          ''
        );
        this.messageResult =
          'No Binance Smart Chain browser detected. You should consider trying MetaMask';
        reject(this.messageResult);
      }
    });
  }

  web3: any;
  initializeWeb3Provider(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      // this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ethNetwork));
      // window.Web3=this.web3;
      // window.web3=this.web3;

      resolve('connected');
    });
  }

  public checkAndInstantiateWeb3(): Promise<string> {
    let options = {
      keepAlive: true,
      withCredentials: false,
      timeout: 20000, // ms
      headers: [
        {
          name: 'Access-Control-Allow-Origin',
          value: '*'
        },

      ],
      agent: {
        // http: http.Agent(...),
        baseUrl: ''
      }
    };
    return new Promise(async (resolve, reject) => {
      // if (window.ethereum) {
      //   this.messageResult = 'connected';
      //   window.web3 = new Web3(window.ethereum);
      //   window.ethereum.enable();
      //   resolve(this.messageResult);
      // } else if (window.Web3) {
      //   this.messageResult = 'connected';
      //   window.web3 = new Web3(window.web3.currentProvider);
      //   resolve(this.messageResult);
      // } else {
      //   console.log(http);

      //   var provider = new Web3HttpProvider('https://rinkeby.infura.io/v3/3ecf32c7738a475f8ba62d25b4dd89b4', options);

      //   // const provider = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3ecf32c7738a475f8ba62d25b4dd89b4'));
      //   // let account = web3.eth.accounts.create(web3.utils.randomHex(32));


      //   // var web3 = new Web3(new Web3.default.providers.HTTPProvider('https://rinkeby.infura.io/v3/3ecf32c7738a475f8ba62d25b4dd89b4'));
      //   // var web3 = new Web3(new Web3.default.providers.HTTPProvider('http://localhost:8545')); Web3HttpProvider
      //   // var provider = new Web3HttpProvider('https://public-node.testnet.rsk.co', options);
      //   var web3 = new Web3(provider);
      //   this.messageResult = 'connected';
      //   window.web3=web3;
      resolve(this.messageResult);
      // }
    });
  }

  public loadBlockChainData(): Promise<string> {
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      const account = web3.eth.getAccounts();
      if (account !== undefined) {
        resolve(account);
      } else {
        this.messageResult = 'There is no account';
        reject(this.messageResult);
      }
    });
  }

  public getEtherBalance(account: any) {
    return new Promise((resolve) => {
      const web3 = window.web3;
      if (web3) {
        const balance = web3.eth.getBalance(account).then((ba: any) => {
          resolve(web3.utils.fromWei(ba, 'Ether'));
        });
      }
    });
  }

  public getERC721Contract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      if (web3) {
        web3.eth.net.getId().then((netId: any) => {
          networkId = netId;
          const abi = GenericERC721.abi;
          const networkAddress = this.ERC_721_CONTRACT_ADDRESS;
          const marketplace = new web3.eth.Contract(abi, networkAddress);
          resolve(marketplace);
        });
      }
    });
  }
  public getLazyNFTERC721Contract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      if (web3) {
        web3.eth.net.getId().then((netId: any) => {
          networkId = netId;
          const abi = LazyNFTERC721.abi;
          const networkAddress = this.ERC_721_CONTRACT_ADDRESS;
          const auction = new web3.eth.Contract(abi, networkAddress);
          resolve(auction);
        });
      }
    });
  }
  public getERC1155Contract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      if (web3) {
        web3.eth.net.getId().then((netId: any) => {
          networkId = netId;
          const abi = GenericERC1155.abi;
          const networkAddress = this.ERC1155_CONTRACT_ADDRESS;
          const marketplace = new web3.eth.Contract(abi, networkAddress);
          resolve(marketplace);
        });
      }
    });
  }
  getLazyNFTERC1155Contract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      if (web3) {
        web3.eth.net.getId().then((netId: any) => {
          networkId = netId;
          const abi = LazyNFTERC1155.abi;
          const networkAddress = this.ERC1155_CONTRACT_ADDRESS;
          const marketplace = new web3.eth.Contract(abi, networkAddress);
          resolve(marketplace);
        });
      }
    });
  }
  public getValueToWei(ether: any) {
    return new Promise((resolve) => {
      const web3 = window.web3;
      resolve(web3.utils.toWei(ether, 'ether'));
    });
  }
  public getValueToBN(value: any) {
    return new Promise((resolve) => {
      const web3 = window.web3;
      resolve(web3.utils.toBN(value));
    });
  }
  public getValueFromWei(wei: any) {
    return new Promise((resolve) => {
      const web3 = window.web3;
      resolve(web3.utils.fromWei(wei, 'ether'));
    });
  }
  // public getERC721MarketPlaceContract() {
  //   return new Promise((resolve) => {
  //     const web3 = window.web3;
  //     if (web3) {
  //       const abi = this.marketPlaceERC721.abi;
  //       const networkAddress = this.MARKET_PLACE_ERC721_CONTRACT_ADDRESS;
  //       const auction = new web3.eth.Contract(abi, networkAddress);
  //       resolve(auction);
  //     }
  //   });
  // }
  getBNBVAlueInDollers() {
    this.getBNBValue().subscribe((res: any) => {
      this.BNB_VALUE.next(Number(res.results[0].vw.toFixed(2)));
      console.log('res', res);
    });
  }
  getFundsValue() {
    this.httpServce.httpRequest('get', 'user/refresh-balance').subscribe((res: any) => {
      this.BNB_VALUE.next(Number(Number(res.dollar_value).toFixed(2)));
      this.walletBallance.next(Number(res.balance.toFixed(5)));
    })
  }
  getBNBValue() {
    return this.httpServce.httpRequest('get', 'bnb-price');
    //
  }
  // async checkWeb3() {
  //   await this.initializeWeb3Provider().then(
  //     (checkConn: any) => {
  //       if (checkConn === 'connected') {
  //         this.loadBlockChainData().then(
  //           (accountData: any) => {
  //             let accountNumber = accountData[0];
  //             if (accountNumber) {
  //               this.accountNumber = accountData[0];
  //               this.walletaddress.next(accountData[0]);
  //               this.getEtherBalance(accountNumber).then((data: any) => {
  //                 this.balance = Number(data).toFixed(2);
  //                 this.walletBallance.next(this.balance);
  //               });
  //             } else {
  //               this.cs.showError('Please unlock Wallet');
  //             }
  //           },
  //           (err) => { }
  //         );
  //       }
  //     },
  //     (err) => { }
  //   );
  // }
  // async checkWeb3_1() {
  //   await this.checkAndInstantiateWeb3Old().then(
  //     (checkConn: any) => {
  //       if (checkConn === 'connected') {
  //         this.loadBlockChainData().then(
  //           (accountData: any) => {
  //             let accountNumber = accountData[0];
  //             if (accountNumber) {
  //               this.accountNumber = accountData[0];
  //           
  //               this.walletaddress.next(accountData[0]);
  //               this.getEtherBalance(accountNumber).then((data: any) => {
  //                 
  //                 this.balance = Number(data).toFixed(2);
  //                 this.walletBallance.next(this.balance);
  //               });
  //             } else {
  //               this.cs.showError('Please unlock Wallet');
  //             }
  //           },
  //           (err) => { }
  //         );
  //       }
  //     },
  //     (err) => { }
  //   );
  // }
  initializeWeb3WithWalletAddress(pvtKey: string) {
    this.web3 = new Web3.providers.WebsocketProvider(this.ethNetwork);
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ethNetwork));
    this.web3.eth.accounts.wallet.add(pvtKey);
    let account = this.web3.eth.accounts.privateKeyToAccount(pvtKey);
    // window.Web3=this.web3;
    this.web3.eth.defaultAccount = account.address;
    window.web3 = this.web3;
  }
}
