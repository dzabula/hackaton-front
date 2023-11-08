import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { MatTableModule } from '@angular/material/table';
import { ApartmentsModule } from './apartments/apartments.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';



@NgModule({
  declarations: [
  ],
  imports: [
    ReservationModule,
    UserModule,
    CityModule,
    CategoryModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
