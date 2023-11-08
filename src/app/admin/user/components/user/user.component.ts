import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { IUser } from 'src/app/shared/interface/i-user';

import { EditComponent } from '../dialog/edit/edit.component';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../service/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class UserComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["fullName","email","phone","edit","delete"];
  users :MatTableDataSource<any>;
  hasUsers: boolean;
  loading: boolean;
  userKeyWord: string = "";
  isSmallScreen:boolean;

  constructor( private userService  :UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ){

  }
  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.loadUsers();
  }



  loadUsers(){
    const token = localStorage.getItem("token");
    this.userService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    
    this.loading = true;
    this.userService.filterUser(this.userKeyWord).subscribe({
      next: data => {
          
          this.loading = false;
          this.hasUsers = data.length > 0;

          this.users = new MatTableDataSource(data);
          this.users.paginator = this.paginator;

      },
      error: xhr => {
        this.snackBar.open("Doslo je do greske prilikom ucitavanja apartmana. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
        });
        console.log(xhr);
      }
    })
  }
  cancelSearch(){
    this.userKeyWord = "";
    this.loadUsers();
  }

  OpenDialog(title: string,message: string){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: title,
        message:message
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  writeRole(user: IUser): string{
    let str;
    if(user.useCases.indexOf(1) >= 0) return "Admin";
    else return "Korisnik";
  }
  
  updateUserDialog(user: IUser){
    const dialogEdit =  this.dialog.open(EditComponent,{
      width: this.isSmallScreen ? '95%' : '80%',

      data:{
        user:user,
        userId:user.id
      }
    })

    dialogEdit.afterClosed().subscribe( result =>{
      if(result == "success"){
        this.loadUsers();
      }
    })
  }

  deleteUserDialog(user: IUser) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete korisnika: "+user.fullName+ " ? Apartman ce moci samo Data Base administrator da vrati u upotrebu nakon brisanja!"
      } 
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result.toString() == "agree"){
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: any){

    var token = localStorage.getItem("token");
    this.userService.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    this.userService.delete(user.id).subscribe({
      next: () =>{
        const index = this.users.data.indexOf(user);
        if (index >= 0) {
          this.users.data.splice(index, 1);
          this.users._updateChangeSubscription(); // Osvježavanje podataka u MatTableDataSource
        }
       const snack = this.snackBar.open("Uspesno ste opbrisali korisnika!", 'Zatvori', {
          panelClass: 'success-snackbar',
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
        });
      },
      error: xhr =>{
        if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        
       const snack  = this.snackBar.open("Doslo je do greske prilikom brisnaja apartmana. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  // setAdminDialog(user: IUser){
  //   const dialogRef = this.dialog.open(SureComponent, {
  //     width: '320px',
  //     data: {
  //       title: "Oprez!!!",
  //       message:"Da li ste sigurni da zelite da  korisnika: "+user.fullName+ " oznacite kao administratora ?"
  //     } 
  //   });

  //   dialogRef.afterClosed().subscribe( result => {
  //     if(result.toString() == "agree"){
  //       this.setAdmin(user);
  //     }
  //   });
  // }
  // setAdmin(user: IUser){
  //   var token = localStorage.getItem("token");
  //   this.useCaseService.headers = new HttpHeaders().set("Authorization", "Bearer" + token);
  //   this.useCaseService.post(user.id).subscribe({
  //     next: response =>{
  //       alert("Uspeno ste setovali admina");
  //       console.log(response);
  //     },
  //     error: xhr =>{
  //       console.log(xhr)
  //       const snack = this.snackBar.open("Doslo je do greske, pokusajte kasnije!", 'Zatvori', {
  //         panelClass: 'success-snackbar',
  //         duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
  //       });

  //     }
  //   })
  // }
  
  shortenString(str: string) {
    if (str.length > 20) {
      return str.substring(0, 17) + '...';
    }
    return str;
  }
}
