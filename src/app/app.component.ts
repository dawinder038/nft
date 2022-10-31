import { Component } from '@angular/core';
import { VenlyConnect, WindowMode } from '@venly/connect';
// import { Venly } from '@venly/web3-provider';
import Web3 from 'web3';
import { CommonService } from './@core/services/common.service';
import { GenericHttpService } from './@core/services/generic-http.service';
// const GenericERC721 = require('./../contracts/ERC721/ERC721.sol/GenericERC721.json');
// import {GenericERC721} from './../contracts'
// declare let window: any;
// const Web31 = require('web3');
// // import { WebsocketProvider } from "web3-providers-ws"
// // import {http} from 'http'
// const http= require('http')
// var Web3HttpProvider = require('web3-providers-http');
// import * as keystore from '../assets/keystore.json'
// const foo = require('../assets/keystore.json');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'nftwist';
  // private web3: Web3;
  ERC_721_CONTRACT_ADDRESS = '0xb2cc813fAFDC73B3b0e876aF798A7E9c4C266973';
 ethNetwork = 'wss://rinkeby.infura.io/ws/v3/6c1395806f8b4f28a4062b6a39d8a2ee';
  constructor(private httpService: GenericHttpService,
    private commonService: CommonService) {
// console.log('foofoofoofoofoofoofoofoofoo',foo);

    //   // console.log(http);
    //   // var provider = new Web3HttpProvider('https://rinkeby.infura.io/v3/3ecf32c7738a475f8ba62d25b4dd89b4', options);

    //   this.web3 = new Web3();
    //   // const provider = new WebsocketProvider(this.ethNetwork)
    //   this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ethNetwork));

    //   // this.web3 = new Web31(this.ethNetwork);
    //   this.web3.eth.getBalance('0x5D75f6f7FcB1909B54389e897ec4d7eA9d683487', async (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     let balance = this.web3.utils.fromWei(result, "ether");
    //     console.log(balance + " ETH");
    // });
    // this.Contract();

    // this.GetCountriesList()

    // this.CreateProviderEngine()
  }

  GetCountriesList() {
    // if (!localStorage.getItem("countries"))
    //   this.httpService.GetCountries().subscribe((res: any) => {
    //     localStorage.setItem("countries", JSON.stringify(res));
    //   });
  }

  CreateProviderEngine() {
//     console.log("web3", this.web3);
//     Venly.createProviderEngine({ clientId: 'Testaccount-capsule', skipAuthentication: true }).then((provider: any) => {
//       console.log("provider", provider);

//       this.web3 = new Web3(provider['_providers']);
//       console.log("Venly_web3", this.web3);
//       // this.AuthVenly();
//       // this.Contract1();
//       this.getERC721Contract();
    // });
  }


  AuthVenly() {
    // this.httpService.AuthenticateVenly().subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem("venlyAuth", JSON.stringify(res.data));
    //     this.CreateWallet();
    //   }
    // });
  }


  wallet: any='0x5D75f6f7FcB1909B54389e897ec4d7eA9d683487';

  CreateWallet() {
    // this.httpService.CreateWallet().subscribe({
    //   next: (res: any) => {
    //     this.wallet = res?.result;
    //     localStorage.setItem("wallet", JSON.stringify(this.wallet));
    //     this.commonService.showSuccess(`Wallet Created Successfully! Balance is ${this.wallet?.balance.balance}`)
    //   }
    // });
  }

  Contract() {
    // var myContract = new this.web3.eth.Contract([], this.wallet?.address, {
    //   from: this.wallet?.address, // default from address
    //   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    // });

    // console.log("myContract", myContract);

  }

  Contract1() {
    // var myContract = new this.web3.eth.Contract([], this.wallet?.address, {
    //   from: this.wallet?.address, // default from address
    //   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    // });
    // console.log("myContract", myContract);
    // this.ConnectVenlyWidget();
  }
  public getERC721Contract() {
    // return new Promise((resolve) => {
    //   // const web3 = window.web3;
    //   const web3 = this.web3

    //   let networkId;
    //   if (web3) {
    //     const abi = GenericERC721.abi;
    //     const networkAddress = this.ERC_721_CONTRACT_ADDRESS;
    //     const marketplace = new web3.eth.Contract(abi, networkAddress);
    //     resolve(marketplace);
    //     // web3.eth.net.getId().then((netId: any) => {
    //     //   networkId = netId;
    //     //   const abi = GenericERC721.abi;
    //     //   const networkAddress = this.ERC_721_CONTRACT_ADDRESS;
    //     //   const marketplace = new web3.eth.Contract(abi, networkAddress);
    //     //   resolve(marketplace);
    //     // });
    //   }
    // });
  }
  GetAllWallets() {
    // this.httpService.GetAllWallets().subscribe({
    //   next: (res: any) => {
    //     console.log("All Wallets", res);
    //   }
    // });
  }


  GetWallet() {
    // this.httpService.GetWalletBalance(this.wallet?.id).subscribe({
    //   next: (res: any) => {
    //     console.log("Wallet", res);
    //   }
    // });
  }

  GetTokenBalance() {
    // this.httpService.GetTokenBalance().subscribe({
    //   next: (res: any) => {
    //     console.log("Token Balance", res);
    //   }
    // });

  }


  ConnectVenlyWidget() {
    // const venlyConnect = new VenlyConnect('Testaccount-capsule');

    // let optns = {
    //   redirectUri: 'https://localhost:4200/',
    //   windowMode: WindowMode.POPUP,
    //   closePopup: true,
    //   idpHint: 'string'
    // }
    // venlyConnect.authenticate(optns).then(account => {
    //   if (account) {
    //   }
    // })
  }


}
