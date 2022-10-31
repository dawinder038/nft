import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionDetailsRoutingModule } from './collection-details-routing.module';
import { CollectionDetailsComponent } from './collection-details.component';



@NgModule({
  declarations: [
    CollectionDetailsComponent,

  ],
  imports: [
    CommonModule,
  
    CollectionDetailsRoutingModule,
    // LoaderComponent
  ]
})
export class CollectionDetailsModule { }
