import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';
import { HttpHeaders } from '@angular/common/http';
import { IReservation } from 'src/app/shared/interface/i-reservation';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css']
})
export class MyReservationComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
                                "title",
                                "from",
                                "to",
                                "amount",
                                "cancelled",
                                "cancel",
                                "isPaid",
                                "createdAt"];


  reservations :MatTableDataSource<any>;
  startDate: Date;
  user: IApplicationUser;
  endDate: Date;
  selectedRadioButtonValue: string
  apartmentKeyWord: string;
  paid: number;
  toBePaid: number;
  salaryYear: number;
  hasReservations: boolean;
  loading: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private jwtHandler: JwtHandlerComponent,
    private dialog: MatDialog  ,
    private reservationService  :ReservationService,
    private router: Router
  ){
    
  }

  ngOnInit(): void {
    this.user = this.jwtHandler.GetUser();
    this.filtrate();
  }

  filtrate(){
    this.loading = true;
    const token = localStorage.getItem("token");
    this.reservationService.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    var from = "";
    var to = "";
    var keyword = "";
    
    if(this.apartmentKeyWord) keyword = this.apartmentKeyWord;
    if(this.startDate != null) from = this.formatDateToYYYYMMDD(this.startDate);
    if(this.endDate != null) to = this.formatDateToYYYYMMDD(this.endDate);    
    
    var isPaid;
    
    if(this.selectedRadioButtonValue == "NotPaid") isPaid = "false";
    else if (this.selectedRadioButtonValue == "Paid") isPaid ="true";
    else isPaid = "";

    this.reservationService.filterReservationYourSelf(from,to,isPaid,keyword).subscribe({
      next: response =>{
        this.loading = false;
        this.hasReservations = response.length > 0;
        this.reservations = new MatTableDataSource(response);
        this.reservations.paginator = this.paginator;
        this.calculatePaidForAllApartments();

      },
      error: xhr =>{
        this.loading = false;
        if(xhr.status == 422){
          this.snackBar.open(xhr.error.errors[0].error, 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
        }
        else if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        else{
          this.snackBar.open("Doslo je do greske na serveru pokusajte kasnije", 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
        }
      }
    })
  }

  calculatePaid(reservation: IReservation)
  {
    if(reservation.isPaid) this.paid -= reservation.amount;
    else this.toBePaid -=reservation.amount;
  }

  calculatePaidForAllApartments()
  {
    var arr = this.reservations.data;
    var paid =0;
    var toBePaid = 0;
    arr.forEach(e=>{
      if(!e.cancelled)
      {
        if(e.isPaid)  paid +=e.amount;
        else toBePaid+=e.amount;
      }
    })
    this.paid = paid;
    this.toBePaid = toBePaid;
  }

  
  CancelledDialog(reservation: IReservation){
    
    if(reservation.cancelled) return;
    
    const dialogRef = this.dialog.open(SureComponent, {
      width: '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da otkazete rezervaciju !? Necete biti u mogucnosti da vratite rezervaciju kao aktivnu!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.Cancelled(reservation);
      }
    });
  }

  Cancelled(reservation: IReservation){
    if(reservation.cancelled) return;
    const token = localStorage.getItem("token");
    this.reservationService.headers = new HttpHeaders().set("Authorization","Bearer "+ token);
    this.reservationService.CancelledYourSelf(reservation.id).subscribe({
      next: response =>{
        reservation.cancelled = true;
        this.calculatePaid(reservation)

        
      },
      error: xhr=>{
        console.log(xhr)
        if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        this.snackBar.open("Doslo je do greske na serveru pokusajte kasnije", 'Zatvori', {
          duration: 10000, 
          panelClass: "error-snackbar"
        });
      }
    })
  
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
