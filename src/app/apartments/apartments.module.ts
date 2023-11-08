import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { AllApartmentsComponent } from './components/apartments/all-apartments/all-apartments.component';
import { SingleApartmentComponent } from './components/apartments/all-apartments/single-apartment/single-apartment.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApartmentsService } from '../shared/services/apartments/apartments.service';
import { FilterComponent } from './components/apartments/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../shared/services/categories/category.service';
import { CitiesService } from '../shared/services/cities/cities.service';
import { MatSelectModule } from '@angular/material/select';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { AddComentsComponent } from './apartment-detail/Components/add-coments/add-coments.component';
import { AdditionalLinesComponent } from './apartment-detail/Components/additional-lines/additional-lines.component';
import { CentralContentComponent } from './apartment-detail/Components/central-content/central-content.component';
import { CommentsComponent } from './apartment-detail/Components/comments/comments.component';
import { GalleryComponent } from './apartment-detail/Components/gallery/gallery.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddReplyComponent } from './apartment-detail/Components/add-reply/add-reply.component';
import { ReservationComponent } from './apartment-detail/Components/reservation/reservation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './apartment-detail/Components/map/map.component';
import { RateComponent } from './apartment-detail/Components/rate/rate.component';
import { PaginationComponent } from './components/apartments/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    ApartmentsComponent,
    PaginationComponent,
    AllApartmentsComponent,
    SingleApartmentComponent, 
    FilterComponent,
    ApartmentDetailComponent,
    AddComentsComponent,
    AdditionalLinesComponent,
    CentralContentComponent,
    CommentsComponent,
    GalleryComponent,
    AddReplyComponent,
    ReservationComponent,
    MapComponent,
    RateComponent
    
  ],
  providers:[ApartmentsService,CategoryService,CitiesService],  
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    CarouselModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    
   
  ]
})
export class ApartmentsModule { }
