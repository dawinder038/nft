import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../@core/services/common.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  userType:any;

  constructor(private cs:CommonService) { }

  ngOnInit(): void {
    this.userType=this.cs.getUserType();
  }
navigate(url:string){
  if(this.userType==1){
    this.cs.navigate(url)
  }
}
}
