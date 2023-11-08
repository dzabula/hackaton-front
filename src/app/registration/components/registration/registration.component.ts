import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../service/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REGEX } from 'src/app/constants/regex';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationError: string;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,        
    private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName: ['', [Validators.required,Validators.pattern(REGEX.NAME)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(REGEX.PHONE)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {

      this.registrationService.put(this.registrationForm.value).subscribe(
        response =>{
          this.snackBar.open('Uspešno ste se registrovali!', 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          });
          this.registrationForm.reset();
          Object.keys(this.registrationForm.controls).forEach(key => {
           this.registrationForm.get(key).setErrors(null);
          });
          
        },
        error=>{
          if(error.status == 422){
            var tekst  = error.error.errors[0].error;
            this.snackBar.open(tekst, 'Zatvori', {
              duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            });
          }else{
            this.registrationError = "Doslo je do greske na serveru pokusajte kasnije!!!";
          }
      
        }
      );
    
    }
  }

  passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password.value === confirmPassword.value) {
      confirmPassword.setErrors(null);
      return null;
    } else {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
}
