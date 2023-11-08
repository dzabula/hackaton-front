import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../service/user.service';
import { IUser } from 'src/app/shared/interface/i-user';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { REGEX } from 'src/app/constants/regex';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent  implements OnInit{
  editUserForm: FormGroup;
  currentUser: IUser;
  editError: string;
  currentFirstName: string;
  currentLastName: string;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
  }
  
  ngOnInit(): void {
    this.currentUser = this.data.user;    
    this.inistializeForm();
  }

  inistializeForm(){
    const nameAndSurname = this.currentUser.fullName.trim().split(' ');
    this.currentLastName = "";
    this.currentFirstName = nameAndSurname[0];
    let i =1; 
    nameAndSurname.forEach(x=>{
      
      if(x != this.currentFirstName){
        if(i == nameAndSurname.length) this.currentLastName += x;
        else this.currentLastName += x + " ";
      }
      i++;
    })
    this.createForm();

  }

  createForm(): void {

    this.editUserForm = this.formBuilder.group({
      firstName: [this.currentFirstName, [Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName: [this.currentLastName, [Validators.required,Validators.pattern(REGEX.NAME)]],
      phone: [this.currentUser.phone,  [Validators.required,Validators.pattern(REGEX.PHONE)]],
      email: [this.currentUser.email,[Validators.required, Validators.email]],
      password: ["",Validators.pattern(REGEX.OPTIONALPASSWORD)],
    });
  }

  close(){
    this.dialogRef.close("dismiss");
  }

  onSubmit(){
    if (this.editUserForm.invalid) {
      return;
    }

    var body = this.editUserForm.value;
    body.Id = this.data.userId;
    console.log("body",body)
    const token = localStorage.getItem("token");
    this.userService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.userService.patch(body).subscribe({
      next:response =>{
        console.log(response)
        this.snackBar.open("Uspesno ste azurirali korisnika. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        this.dialogRef.close("success");

      },
      error:xhr =>{
        if(xhr.status == 422){
          this.snackBar.open(xhr.error.errors[0].error, 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
        }
        else if(xhr.status == 401){
          this.router.navigate(['/login']);;
          
        }else{
          this.snackBar.open("Doslo je do greske na serveru!!!", 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
        }
      }
    })

  }
}
