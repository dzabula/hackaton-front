import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { IReservation } from 'src/app/shared/interface/i-reservation';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})

export class ReservationComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
                                "fullName",
                                "phone",
                                "title",
                                "from",
                                "to",
                                "amount",
                                "cancelled",
                                "cancel",
                                "isPaid",
                                "markPaid",
                                "delete",
                                "createdAt",
];


  reservations :MatTableDataSource<any>;
  startDate: Date;
  endDate: Date;
  selectedRadioButtonValue: string
  apartmentKeyWord: string;
  salary: number;
  salaryMonth: number;
  salaryYear: number;
  hasReservations: boolean;
  loading: boolean;
  isSmallScreen: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog  ,
    private reservationService  :ReservationService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,

  ){}

  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.loadReservations();
  }


  loadReservations(){
    this.loading = true;
    const token = localStorage.getItem("token");
    this.reservationService.headers = new HttpHeaders().set("Authorization", "Bearer " +token);
    this.reservationService.get().subscribe({
      next: response =>{
        this.loading = false;
        this.hasReservations =  response.length > 0;

        this.reservations = new MatTableDataSource(response);
        this.reservations.paginator = this.paginator;
        this.calculateSalary();
      },
      error: xhr =>{
        this.loading = false;
        alert("Nisu uspele da stignu sve rezervacije!!");
      }
    })
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  calculateSalary()
  {
    const today = new Date();
    var s = 0;
    var sm = 0;
    var sy = 0;

    this.reservations.data.forEach(e=>{
      if(e.isPaid && !e.cancelled)
      {
        s+=e.amount;
        var date = new Date(e.from);

        if(date.getMonth() == today.getMonth())
        { 
          sm += e.amount;
        }
        if(date.getFullYear() == today.getFullYear())
        {
          sy += e.amount;
        }
      }
    })

    this.salary = s;
    this.salaryMonth = sm;
    this.salaryYear = sy;

  }

  //calculate Salary When One Reservation Cancel or Recance
  calculateSalaryCancel(reservation : IReservation){
    const today = new Date();
    var s = this.salary;
    var sm = this.salaryMonth;
    var sy = this.salaryYear;

    if(reservation.isPaid)
    {
      if(!reservation.cancelled)
      {

        s+=reservation.amount;
        var date = new Date(reservation.from);
  
        if(date.getMonth() == today.getMonth())
        { 
          sm += reservation.amount;
        }
        if(date.getFullYear() == today.getFullYear())
        {
          sy += reservation.amount;
        }
      
      }
      else
      {

        s-=reservation.amount;
        var date = new Date(reservation.from);

        if(date.getMonth() == today.getMonth())
        { 
          sm -= reservation.amount;
        }
        if(date.getFullYear() == today.getFullYear())
        {
          sy -= reservation.amount;
        }

      }
      
    }
    this.salary = s;
    this.salaryMonth = sm;
    this.salaryYear = sy;
  }

  //calculate salary when one reservation mark as paid
  calculateSalaryMarkPaid(reservation: IReservation){
    if(!reservation.cancelled){
      const today = new Date();
      var s = this.salary;
      var sm = this.salaryMonth;
      var sy = this.salaryYear;

      if(reservation.isPaid)
      {

        s+=reservation.amount;
        var date = new Date(reservation.from);
  
        if(date.getMonth() == today.getMonth())
        { 
          sm += reservation.amount;
        }
        if(date.getFullYear() == today.getFullYear())
        {
          sy += reservation.amount;
        }
      
      }
      else
      {

        s-=reservation.amount;
        var date = new Date(reservation.from);
  
        if(date.getMonth() == today.getMonth())
        { 
          sm -= reservation.amount;
        }
        if(date.getFullYear() == today.getFullYear())
        {
          sy -= reservation.amount;
        
        }
      }

      this.salary = s;
      this.salaryMonth = sm;
      this.salaryYear = sy;
    }
  }

  openDialog(title: string,message: string){
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

  markPaidDialog(reservation: IReservation){
    var str = reservation.isPaid ? "neplacenu" : "placenu";
    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da oznacite rezervaciju kao "+str+"?"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.markPaid(reservation);
      }
    });
  }

  markPaid(reservation: IReservation){
    const token = localStorage.getItem("token");
    this.reservationService.headers = new HttpHeaders().set("Authorization","Bearer "+ token);
    this.reservationService.markPaid(reservation.id).subscribe({
      next: response =>{
        reservation.isPaid = !reservation.isPaid
        this.calculateSalaryMarkPaid(reservation)

        
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

  openDialogMarkCancel(reservation: IReservation){
    var str =reservation.cancelled ? "aktivnu" :"otkazanu";
    const dialogRef = this.dialog.open(SureComponent, {
      width: '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da oznacite rezervaciju kao " + str
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.MarkCancelOrRecancel(reservation);
      }
    });
  }

  MarkCancelOrRecancel(reservation: IReservation){
    var id = reservation.id;
    var token = localStorage.getItem("token");

    if(token == null || token == "") this.router.navigate(['/login'])    ;
    
    this.reservationService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.reservationService.markCancelOrRecancel(id).subscribe({
      next: response =>{
        reservation.cancelled = !reservation.cancelled;
        this.calculateSalaryCancel(reservation)

      },
      error:xhr =>{

        console.log(xhr);
        if(xhr.status == 404){
          this.snackBar.open("Rezervacija nije pronadjena",'Zatvori', {
            duration: 10000, 
            panelClass: "error-snackbar"
          });
        }else if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        else{
          this.snackBar.open("Doslo je do greske na serveru. Pokusajte kasnija!", 'Zatvori', {
            duration: 10000, 
            panelClass: "error-snackbar"
          });
        }
      }
    })
  
  
  }


  deleteReservationsDialog(reservation: IReservation) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete rezervaiju!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.deleteReservation(reservation);
      }
    });
  }

  deleteReservation(reservation :IReservation){

      var token = localStorage.getItem("token");
      this.reservationService.headers = new HttpHeaders().set("Authorization", "Bearer " + token);
      this.reservationService.delete(reservation.id).subscribe({
        next: repsonse=>{
          this.snackBar.open("Uspesno ste obrisali rezervaciju", 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
          const newArrReservations = this.reservations.data.filter(x => x.id != reservation.id);
          this.reservations = new MatTableDataSource(newArrReservations);
        },
        error: xhr =>{
          if(xhr.status == 422){
            this.snackBar.open(xhr.error.errors[0].error, 'Zatvori', {
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
      });
  }

  filtrate(){
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

    this.loading = true;
    this.reservationService.filterReservation(from,to,isPaid,keyword).subscribe({
      next: response =>{
        this.loading = false;
        this.hasReservations = response.length > 0;
        this.reservations = new MatTableDataSource(response);
      },
      error: xhr =>{
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

  shortenString(str: string) {
    if(str){
      if (str.length > 20) {
        return str.substring(0, 17) + '...';
      }
      return str;
    }
    return "";
  }

}
