import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BanersComponent } from './home/Components/baners/baners.component';
import { FeaturesComponent } from './home/Components/features/features.component';
import { SectionVideoComponent } from './home/Components/section-video/section-video.component';
import { AboutUsComponent } from './home/Components/about-us/about-us.component';
import { CategoiresComponent } from './home/Components/categoires/categoires.component';
import { BannerService } from './home/services/banner.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PremiumApartmentsComponent } from './home/Components/premiumApartments/premium-apartments.component';
import { ApartmentsService } from '../shared/services/apartments/apartments.service';
import { EconomicApartmentComponent } from './home/Components/economic-apartment/economic-apartment.component';
import { ContactComponent } from './home/Components/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FloorPlanComponent } from './home/Components/floor-plan/floor-plan.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    HomeComponent,
    EconomicApartmentComponent,
    BanersComponent,
    FeaturesComponent,
    SectionVideoComponent,
    AboutUsComponent,
    CategoiresComponent,
    PremiumApartmentsComponent,
    ContactComponent,
    FloorPlanComponent
  ],
  providers :[BannerService,ApartmentsService],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatNativeDateModule,
    LeafletModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,

  
  ]
})
export class HomeModule { }
