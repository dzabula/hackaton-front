import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { SuccesSendComponent } from 'src/app/shared/Dialogs/succes-send/succes-send.component';
import { CommentsService } from 'src/app/shared/services/comments/comments.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-coments',
  templateUrl: './add-coments.component.html',
  styleUrls: ['./add-coments.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class AddComentsComponent {
  @Input() id: number;
  @Output() commentAdded = new EventEmitter<string>();
  loading: boolean = false;
  public forma: FormGroup; 
  
  
  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private commentService: CommentsService,
              private jwtManager: JwtHandlerComponent) {
    this.forma = this.formBuilder.group({
      message: new FormControl("",[Validators.required])
    }); 
  }

  ngOnInit(): void {
  
  }

  submitedForm(): void{
    
    if(!this.jwtManager.IsValidToken()){
      const dialogRef = this.dialog.open(PopUpComponent, {
        width: '40%',
        data: {title:"Greska",message:"Morate biti ulogovani da biste ostavili komentar"} 
      });
      return;
    }
    
    this.loading = true;
    var body = this.forma.value;
    
    body.parrentId = 0;
    body.apartmentId = this.id;
    body.text = this.forma.value.message;

    const token = localStorage.getItem("token");
    this.commentService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
  
    this.commentService.put(body).subscribe({
      next:response=>{
        this.loading = false;

        this.snackBar.open("Uspesno ste ostavili komentar.", 'Zatvori', {
          duration: 2000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        
        const messageControl = this.forma.get('message');
        if (messageControl) {
          messageControl.setValue('');
          messageControl.markAsUntouched();
          messageControl.setErrors(null);
        }
        

        this.commentAdded.emit(body.text); // slanje dogadjaja roditelju kako bi osvezio komentare
      },
      error: xhr=>{
       
        var error = "";
        this.loading = false;

        if(xhr.status == 422){
          error = xhr.error.errors[0].error;
        }
        else if(xhr.status == 401){
          error = "Morate biti ulogovani da biste ostavili komentar ili vas korisnicki nalog nema privilegije za ostavljanje komentara"
        }
        else error = "Doslo je do greske na serveru. Molimo pokusajte kasnije."

        const dialogRef = this.dialog.open(PopUpComponent, {
          width: '40%',
          data: {title:"Greska",message:error} 
        });
      }
    })

 
  }

}
