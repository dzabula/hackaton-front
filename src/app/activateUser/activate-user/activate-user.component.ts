import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { UseCaseService } from 'src/app/shared/services/useCase/use-case.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  isSuccess: boolean;
  
  constructor(private useCaseService: UseCaseService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var code = params['code'];
      if(!code) this.displayError();

      this.useCaseService.post({"code":code}).subscribe({
        next: response =>{
          this.isSuccess = true;
          this.displaySuccess();
        },
        error: xhr =>{
          console.log(xhr);
          this.displayError();
        }
      })

    });
  }

  displaySuccess(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '80%',
      data: {title:"Vaš nalog je sada aktivan.",message:"Uspešno ste aktivirali Vaš nalog. Sada se možete ulogovati."} 
    })
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/login"]);
    });
  }

  displayError(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '40%',
      data: {title:"Greska",message:"Došlo je do greške prilikom aktivacije vašeg profila. Kontaktirajte podršku."} 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/home"]);
    });
  }

}
