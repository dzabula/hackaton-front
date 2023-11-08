import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  insertError: string;
  insertCityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    private cityService: CitiesService,
    private snackBar: MatSnackBar,
    private router: Router

  ){
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('80%');
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.insertCityForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  onSubmit(): void {
    
    if (this.insertCityForm.invalid)
    {
      return;
    }

    var body = this.insertCityForm.value; // kopiramo sve podatke iz forme u boy pa cemo u daljem kod formatirati body u isptavnom formatui za API
    const token = localStorage.getItem("token");
    this.cityService.headers = new HttpHeaders().set("Authorization","Bearer " + token);

    this.cityService.put(body).subscribe({
      next:response=>{
        this.snackBar.open("Uspesno ste kreirali kategoirju. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "success-snackbar"
        });
        this.dialogRef.close("success");
      },
      error:xhr=>{
        if(xhr.status == 422){
          this.insertError = xhr.error.errors[0].error;
        }
        else if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        else{
          this.insertError = "Doslo je do greske prilikom kreiranja nove kategorije!!! Pokjusajte kasnije!!!";
        }
        console.log(xhr);
      }
    });


  }

  close(){
    this.dialogRef.close("dismiss")
  }
}
