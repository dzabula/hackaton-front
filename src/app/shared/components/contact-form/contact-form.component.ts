import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccesSendComponent } from 'src/app/shared/Dialogs/succes-send/succes-send.component';
import { MessageService } from '../../services/message/message.service';
import { PopUpComponent } from '../../Dialogs/pop-up/pop-up.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() FullName: string = "";
  @Input() Email: string = "";
  
  public forma: FormGroup; 
  
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private messageService: MessageService, 
    private snackBar: MatSnackBar) {
     
  }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      email: new FormControl(this.Email,[Validators.required, Validators.email]),
      name: new FormControl(this.FullName,[Validators.required]),
      message: new FormControl("",[Validators.required])
    
    }); 
  }

  submitedForm(): void{
    var body = {
      "fullName" : this.FullName,
      "email": this.Email,
      "message":this.forma.get("message").value
    }

    this.messageService.put(body).subscribe({
      next: response =>{

        // regulacija koliko neki korisnik moze puta da posalje mejl
        if(this.validateUserToSendMail())
        {
          this.incrementNumberOfSendsMail();
          this.notifySuccessSendMail();
        }
        else
        {
          this.notifyFaildSendMail();
        }


      },
      error: xhr =>{
        this.snackBar.open("Doslo je do greske na serveru pokusajte kasnije", 'Zatvori', {
          duration: 10000, 
          panelClass: "error-snackbar"
        });
      }
    })



    
  }

  //Validacija da li korisnik moze da posalje jos poruka na Email administratora kako ne bi doslo do spam-a administratora
  //Logika se sprovodim putem localStorage-a
  //Korisnik ne moze poslati vise od pet poruka tokom jednog dana
  validateUserToSendMail():boolean
  {
    var numberOfSendsMail = localStorage.getItem("numberOfSendsMail");
    if(!numberOfSendsMail)
    {
      return true;
    }
    else
    {
      var date = new Date();
      var currentObj = JSON.parse(numberOfSendsMail);
      var currentObjDate = new Date(currentObj.date);
      var bool =   date.getFullYear() == currentObjDate.getFullYear() && 
        date.getMonth() == currentObjDate.getMonth() &&
        date.getDate() == currentObjDate.getDate() && currentObj.number < 5

      return bool;

    }

  }

  //Povecanje broja poslatih borja poruka od strane istog korisnika
  //Logika se sprovodim putem localStorage-a
  //Korisnik ne moze poslati vise od pet poruka tokom jednog dana
  incrementNumberOfSendsMail()
  {
    
    var numberOfSendsMail = localStorage.getItem("numberOfSendsMail");
    if(numberOfSendsMail == null)
    {
      var date = new Date();
      var obj = {"date":date,"number":1};
      numberOfSendsMail = JSON.stringify(obj);
      localStorage.setItem("numberOfSendsMail",numberOfSendsMail);
    }
    else
    {
      var currentObj = JSON.parse(numberOfSendsMail);
      var date = new Date();
      var obj = {"date":date,"number": parseInt(currentObj.number) + 1};
      numberOfSendsMail = JSON.stringify(obj);
      localStorage.setItem("numberOfSendsMail",numberOfSendsMail);
    }
  }

  notifySuccessSendMail()
  {
    const dialogRef = this.dialog.open(SuccesSendComponent, {
      width: '320px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.forma.reset();
      Object.keys(this.forma.controls).forEach(key => {
       this.forma.get(key).setErrors(null);
      });
    });


    // this.forma.controls['email'].setValue("");      
    // this.forma.controls['phone'].setValue("");      
    // this.forma.controls['name'].setValue("");      
    // this.forma.controls['message'].setValue("");   
    // this.forma.controls['email'].markAsPristine();  
    // this.forma.controls['email'].markAsUntouched();  
    // this.forma.controls['phone'].markAsPristine();  
    // this.forma.controls['phone'].markAsUntouched();  
    // this.forma.controls['name'].markAsPristine();  
    // this.forma.controls['name'].markAsUntouched();  
    // this.forma.controls['message'].markAsPristine();  
    // this.forma.controls['message'].markAsUntouched();  
  }

  notifyFaildSendMail(){
    
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '320px',
      data: {title:"Greška!!!", message:"Dostigli ste Vaš dnevni limit. Ne možete poslati više od 5 poruka našem agentu tokom jednog dana!"} 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
