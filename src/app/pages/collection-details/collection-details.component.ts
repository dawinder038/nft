import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  collectionDetailResponse: any;
  collectionId: String = "";
  marketPlaceNfts: any[] = [];
  constructor(private httpService: GenericHttpService, private route: ActivatedRoute, private cs: CommonService) { this.getRouteParams(); }

  getRouteParams() {
    this.collectionId = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getCollectionDetails();
    this.filterNFTsByCollection();
  }

  getCollectionDetails() {
    let payload = {
      id: this.collectionId
    }
    this.httpService.httpRequest('get', 'nft/collection', payload).subscribe((response: any) => {
      this.collectionDetailResponse = response;
    })
  }

  filterNFTsByCollection() {
    let payload = {
      collection_id: this.collectionId,
      limit: 4,
      page: 1
    }
    this.httpService.httpRequest('get', 'nfts', payload).subscribe((res: any) => {
      this.marketPlaceNfts = res[0].data;
    });
  }
  
  copyCollectionAddress(address: string) {
    navigator.clipboard.writeText(address);
    this.cs.showSuccess('Collection Address Copy Successfully');
  }
}
