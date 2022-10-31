import { Component, OnInit } from '@angular/core';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-choose-blockchain',
  templateUrl: './choose-blockchain.component.html',
  styleUrls: ['./choose-blockchain.component.scss']
})
export class ChooseBlockchainComponent implements OnInit {

  blockChains: any[] = [];
  isLoading: boolean = false;
  constructor(private httpService: GenericHttpService) { }
  baseImgUrl: string = this.httpService.originalImgUrl;
  ngOnInit(): void {
    this.getBlockchains();
  }
  getBlockchains() {
    this.isLoading= true;
    this.httpService.httpRequest('get', 'blockchains', null).subscribe((resp: any) => {
      this.blockChains = resp.blockchains;
      this.isLoading = false;
    })
  }
}
