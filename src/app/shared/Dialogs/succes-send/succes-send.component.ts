import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'; 
@Component({
  selector: 'app-succes-send',
  templateUrl: './succes-send.component.html',
  styleUrls: ['./succes-send.component.css']
})
export class SuccesSendComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccesSendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('60%');
    }
  }

  zatvori() {
    this.dialogRef.close("success");
  }
}
