import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './Home_Child_Components/banner/banner.component';
import { ActivitiesComponent } from './Home_Child_Components/activities/activities.component';
import { NewsfeedComponent } from './Home_Child_Components/newsfeed/newsfeed.component';
import { PartnersComponent } from './Home_Child_Components/partners/partners.component';
import { PartnersNftComponent } from './Home_Child_Components/partners-nft/partners-nft.component';
import { FeaturenewsComponent } from './Home_Child_Components/featurenews/featurenews.component';
import { MarketplaceComponent } from './Home_Child_Components/marketplace/marketplace.component';
import { HomeModalsComponent } from './Home_Child_Components/home-modals/home-modals.component';
import { HotProjectsComponent } from './Home_Child_Components/hot-projects/hot-projects.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ActivitiesComponent,
    NewsfeedComponent,
    PartnersComponent,
    PartnersNftComponent,
    FeaturenewsComponent,
    MarketplaceComponent,
    HomeModalsComponent,
    HotProjectsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    FormsModule
  ]
})
export class HomeModule { }
