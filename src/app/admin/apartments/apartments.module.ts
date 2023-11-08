import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagmentComponent } from './components/managment/managment.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ManagmentRoutingModule } from './apartments.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditComponent } from './components/dialog/edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { InsertComponent } from './components/dialog/insert/insert.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    ManagmentComponent,
    EditComponent,
    InsertComponent
  ],
  imports: [
    AngularEditorModule,
    FormsModule,
    ManagmentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatPaginatorModule
  ]
})
export class ApartmentsModule { }
