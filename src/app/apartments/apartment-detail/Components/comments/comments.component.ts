import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';
import { IComment } from 'src/app/shared/interface/i-comment';
import { IUser } from 'src/app/shared/interface/i-user';
import { CommentsService } from 'src/app/shared/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges,OnInit  {
    @Input() idApartment: number;
    @Input() comments: IComment[];
    @Input() appUser:IApplicationUser;
    @Output() replyAdded = new  EventEmitter<string>();

    constructor(

                private snackBar: MatSnackBar,
                private commentService: CommentsService,
                private dialog: MatDialog)
    {}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
      this.comments = this.comments;
      
        // Ovde možete ažurirati komentare ili izvršiti dodatne akcije
    
    }

    DeleteCommentDialog(id: number){
      const dialogRef = this.dialog.open(SureComponent, {
        width: '320px',
        data: {
          title: "Oprez!!!",
          message:"Da li ste sigurni da zelite da obrisete komentar!"
        } 
      });
  
      dialogRef.afterClosed().subscribe( result => {
        if(result.toString() == "agree"){
          this.DeleteComment(id);
        }
      });

    }

    DeleteComment(id: number){
      
      const token = localStorage.getItem("token");

      this.commentService.headers = new HttpHeaders().set("Authorization","Bearer "+ token);
      this.commentService.deleteYourSelf(id).subscribe({
        next: response =>{
            this.snackBar.open("Komentar je obrisan", 'Zatvori', {
              duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
              panelClass: "error-snackbar"
            });

            this.comments = this.comments.filter(x=> x.id != id);
            this.comments.map(element => {
              if(element.childs != null){
                element.childs = element.childs.filter(x=> x.id != id);
              }

            });

        },
        error: xhr =>{
          if(xhr.status == 422){
            this.snackBar.open(xhr.error.errors[0].error, 'Zatvori', {
              duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
              panelClass: "error-snackbar"
            });
          }
          else if(xhr.status == 403){
            this.snackBar.open("Mozete obrisati samo vlastiti komentar.", 'Zatvori', {
              duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
              panelClass: "error-snackbar"
            });
          }
          else{
             this.snackBar.open("Doslo je do greske na serveru, pokusajte kasnije!", 'Zatvori', {
              duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
              panelClass: "error-snackbar"
            });
            console.log(xhr);
          }
        }
      })
    }

    ToggleReplyForm(index: number){
      console.log("proslo")
      this.comments[index].showReplyForm = !this.comments[index].showReplyForm;
    }

    WirteDate(dateStr: string): string{
      const date = new Date(dateStr);

      var minutes = date.getMinutes();
      var minutesStr;
      if(minutes < 10) minutesStr = '0' + minutes;
      else minutesStr = minutes;
      var hours = date.getHours();
      var hoursStr;
      if(hours < 10) hoursStr = "0" + hours;
      else hoursStr = hours;
      const day = date.getDate();
      var dayStr;
      if(day < 10) dayStr = '0' + day;
      else dayStr = day;
      const month = date.getMonth() + 1; // Meseci kreću od 0 (januar) do 11 (decembar), pa dodajemo 1
      var monthStr;
      if(month < 10) monthStr = '0' + month;
      else monthStr = month;
      
      const year = date.getFullYear();

      const formattedDate = `${hoursStr}:${minutesStr}h  ${dayStr}.${monthStr}.${year}.`;
      return formattedDate;

    }

    ReplyAddedEventMethod(){
      this.replyAdded.emit("");
    }

   
    IsAsdminstrator(obj: any): boolean{
      // @ts-ignore
      var arr = obj.useCases.filter(x=>x.useCaseId == 39);
      return arr.length > 0

    }

}
