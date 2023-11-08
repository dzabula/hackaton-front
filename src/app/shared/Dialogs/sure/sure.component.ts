import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'; 
@Component({
  selector: 'app-succes-send',
  templateUrl: './sure.component.html',
  styleUrls: ['./sure.component.css']
})
export class SureComponent {

  constructor(
    public dialogRef: MatDialogRef<SureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('320px');
    }
  }

  dismiss() {
    this.dialogRef.close("dismiss");
  }


  agree() {
    this.dialogRef.close("agree");
  }
}

