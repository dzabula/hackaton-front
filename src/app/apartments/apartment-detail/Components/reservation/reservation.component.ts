import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { REGEX } from 'src/app/constants/regex';
import { SEASSON } from 'src/app/constants/seasson';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  dateStart: Date = new Date() ;
  dateEnd: Date = new Date();
  numbersOfPersons: number[] = [1,2,3,4,5,6,7,8,9];
  sumPrice: number | null = null;

  minEndDate: string;
  displayErrorAboutDate: boolean;
  fullName: string;
  phone: string;
  email: string;

  reservationForm: FormGroup;
  isLogedInUser: boolean;
  currentApartment: IApartment;
  bookedDatesObjects: any[] = [];
  bookedDates: Date[] = [];
  isLoading: boolean = false;
  secondPrice: number;

  defaultSelectedNumPerson: number;
  selectedNumPerson: number;

  @ViewChild('dateEndPicker') dateEndPicker!: MatDatepicker<Date>;
  @ViewChild('dateStartPicker') dateStartPicker!: MatDatepicker<Date>;
  
  constructor(
              private snackBar: MatSnackBar,
              private reservationService: ReservationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private jwtHandler: JwtHandlerComponent,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ReservationComponent>,
              private dialog: MatDialog,
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
      this.currentApartment = this.data.apartment;
      this.bookedDatesObjects = this.data.apartment.reservations;
      this.selectedNumPerson = this.currentApartment.minPerson;

      const currentDate = new Date();
      this.dateStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1,13,30,1);
      this.dateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2,13,30,1);

      this.isLogedInUser = this.jwtHandler.IsValidToken();
      this.fillArrayNumberOfPersons();

      this.reservationForm = this.formBuilder.group({
        fullName: ["", [Validators.required, Validators.pattern(REGEX.NAME)]],
        phone: ["", [Validators.required, Validators.pattern(REGEX.PHONE)]],
        email: ["", [Validators.required, Validators.email]],
        dateStart: [this.dateStart, Validators.required],
        dateEnd: [this.dateEnd, Validators.required],
        numPerson: [this.currentApartment.minPerson, Validators.required]
      });

      this.fillBookedDatesArray();
      this.disableBookedDate();
      this.calculatePrice();
      this.setSecondPrice();
  }

  setSecondPrice(){
    var currDate = new Date();
    var isSummer = currDate.getMonth() > SEASSON.START && currDate.getMonth() < SEASSON.END;
    if(!isSummer)
    {
      this.secondPrice = this.currentApartment.price.pricePerNight;
    }
    else
    {
      this.secondPrice = this.currentApartment.price.priceOnHoliday;
    }
  }

  get minDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }

  fillArrayNumberOfPersons(){
    var x = [];
    for(let i =this.currentApartment.minPerson ; i<= this.currentApartment.maxPerson;i++){
      x.push(i);
    }
    this.numbersOfPersons = x;
  }
  // disable-ovanje datuma koji su manji od datuma useljavanja
  onDateStartChange() {
    var tmp = new Date(this.dateStart);
    tmp.setDate(this.dateStart.getDate() + 2);
    this.minEndDate =  tmp.toISOString().split('T')[0];
    this.calculatePrice();
  }

  fillBookedDatesArray(){
    this.bookedDatesObjects = this.bookedDatesObjects.map(reservation => ({
      from: new Date(reservation.from),
      to: new Date(reservation.to)
    }));

    this.bookedDatesObjects.forEach(e=>{
      for (let date = e.from; date <= e.to; date.setDate(date.getDate() + 1)) {
        this.bookedDates.push(new Date(date));
      }
    })
  }

  filterUnavailableDates = (d: Date | null): boolean => {
    const date = d || new Date();
    return !this.bookedDates.some(bookedDate => this.isSameDate(date, bookedDate));
  };

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  calculatePrice() {
   
      var numPerson = this.reservationForm.get("numPerson").value;
      if(this.dateEnd < this.dateStart){
        return;
      }
      if( this.dateStart.getFullYear() === this.dateEnd.getFullYear() &&
      this.dateStart.getMonth() === this.dateEnd.getMonth() &&
      this.dateStart.getDate() === this.dateEnd.getDate()){
        this.displayErrorAboutDate = true;
        return;
      }else this.displayErrorAboutDate = false;
      
      var price = this.data.priceOnHoliday;
      var specPrices = this.currentApartment.specPrices;

      const dateStart = new Date(this.dateStart);
      var dateEnd = new Date(this.dateEnd);
      let sumPrice = 0;
      console.log("strat Date dani", dateStart.getDate())
      
      // Iteracija kroz sve datume od useljenja do iseljenja
      let currentDate = new Date(dateStart);
      while (currentDate < dateEnd) {
        console.log("")
        let summer = (currentDate.getMonth() + 1) >= SEASSON.START && (currentDate.getMonth() + 1 ) <= SEASSON.END;
        let newYear = ((currentDate.getMonth() + 1) == 12 && (currentDate.getDate()) >= SEASSON.NEWYEAR.START) || ((currentDate.getMonth() + 1) == 1 && (currentDate.getDate()) <= SEASSON.NEWYEAR.END)  
        if(summer){
          price = this.data.pricePerNight;
        }
        else if(newYear)
        {
          price = this.data.priceOnNewYear;
        }
        else
        {
          price = this.data.priceOnHoliday;
        }
        // Provera da li je trenutni dan specijalan dan
        const cuurentDateMonth = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        var holiday = specPrices.filter(spec => {
          const specDate = new Date(spec.date);
          const specMonthDay = `${specDate.getMonth() + 1}-${specDate.getDate()}`; // Dobijamo MM-dd format iz datuma u nizu
          return specMonthDay === cuurentDateMonth;
        });

        
        if (holiday.length > 0) {
          sumPrice += holiday[0].price;
        }
        else{
          sumPrice += price;
        }
        // Prelazak na sledeći dan
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if(this.currentApartment.minPerson < numPerson ){
        var x = numPerson - this.currentApartment.minPerson;
        sumPrice += x*this.currentApartment.pricePerPerson;
      }
      this.sumPrice = sumPrice;
      
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  disableBookedDate(){

  }

  submit(){
    if(this.reservationForm.invalid && !this.jwtHandler.IsValidToken()) return;
    var body = {
      from: this.formatDateToYYYYMMDD(this.dateStart),
      to :this.formatDateToYYYYMMDD(this.dateEnd),
      apartmentId: this.data.idApartment,
      userId:0,
      fullName:"",
      phone:"",
      email:"",
      numPerson: 1,
    }
    if(this.isLogedInUser){
      body.userId = this.jwtHandler.GetUser().UserId;
    }else{
      body.fullName = this.fullName;
      body.phone = this.phone;
      body.email = this.email;
    }
    
    body.numPerson = this.selectedNumPerson;

    if(this.jwtHandler.IsValidToken()){
      var token = localStorage.getItem("token");
      this.reservationService.headers = new HttpHeaders().set("Authorization","Bearer "+token);
    }

    this.isLoading = true;
    this.reservationService.put(body).subscribe({
      next: repsosne=>{
        this.isLoading = false;
        const dialogRef = this.dialog.open(PopUpComponent, {
          width: '80%',
          data: {title:"Uspesno ste rezervisali apartman.",message:"Poslat Vam je mejl sa detaljnim informacijama o rezervaiji. Ukoliko ste ulogovani mozete u sekciji 'Rezervacije' pronaci sve svoje rezervacije."} 
        })
        this.bookedDatesObjects.push({
          from:new Date(body.from),
          to:new Date(body.to)
        })
        dialogRef.afterClosed().subscribe(result => {
          this.dialogRef.close(this.bookedDates);

        });
      
    
      },
      error: xhr =>{
        this.isLoading = false;

        console.log(xhr);
        if(xhr.status == 422){
          const dialogRef = this.dialog.open(PopUpComponent, {
            width: '80%',
            data: {title:"Doslo je do greske.",message:xhr.error.errors[0].error} 
          })
        }
        else{
          const dialogRef = this.dialog.open(PopUpComponent, {
            width: '80%',
            data: {title:"Doslo je do greske.",message:"Doslo je do greske na serveru, pokusajte kasnije"} 
          })
        }
      }
    })



  }


}
