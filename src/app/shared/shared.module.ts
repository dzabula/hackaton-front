import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoryService } from './services/categories/category.service';
import { RsdToEur } from './pipes/rsd-to-eur-pipe';
import { SuccesSendComponent } from './Dialogs/succes-send/succes-send.component';
import { MinValidator, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoverComponent } from './components/cover/cover.component';
import { ApartmentsService } from './services/apartments/apartments.service';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { JwtHandlerComponent } from './components/jwt-handler/jwt-handler.component';
import { PopUpComponent } from './Dialogs/pop-up/pop-up.component';
import { SureComponent } from './Dialogs/sure/sure.component';
import { MoneyFormat } from './pipes/money-format.pipe';
import { FormatDate } from './pipes/format-date.pipe';
import { FormatDateWithDay } from './pipes/format-date-with-day.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyService } from './services/currency/currency.service';


@NgModule({
  declarations: [
    SuccesSendComponent,
    CoverComponent,
    RsdToEur,
    GoogleMapComponent,
    ContactFormComponent,
    JwtHandlerComponent,
    PopUpComponent,
    SureComponent,
    MoneyFormat,
    FormatDate,
    FormatDateWithDay
  ],
  providers : [CurrencyService, CategoryService,ApartmentsService],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    CurrencyPipe,
    MatSnackBarModule
  ],
  exports: [MinValidator ,CurrencyPipe,RsdToEur,CoverComponent,GoogleMapComponent,ContactFormComponent,ContactFormComponent, MoneyFormat,FormatDate,FormatDateWithDay]
})
export class SharedModule { }
