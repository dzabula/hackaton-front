import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ReservationComponent } from '../reservation/reservation.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SEASSON } from 'src/app/constants/seasson';

@Component({
  selector: 'app-central-content',
  templateUrl: './central-content.component.html',
  styleUrls: ['./central-content.component.css']
})
export class CentralContentComponent implements OnInit{
    @Input() data: IApartment;
    isSmallScreen: boolean;
    isSummer: boolean;
    specPrices: any[];
    currentPrice: number;
    minPerson: number;
    maxPerson: number;
    arrPerson: any[];

    constructor(private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
    ){}
      
    ngOnInit(): void {
      this.arrPerson = new Array();
      this.minPerson = this.data.minPerson;
      this.maxPerson = this.data.maxPerson;
      
      for(let i = this.minPerson; i <= this.maxPerson; i++){
        this.arrPerson.push(i);
      }
      
      this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
      this.specPrices = this.data.specPrices;
      var currDate = new Date();
      this.isSummer = currDate.getMonth() > SEASSON.START && currDate.getMonth() < SEASSON.END;
      this.setCurrentPrice();
    }

    setCurrentPrice(){
      if(this.isSummer)
      {
        this.currentPrice = this.data.price.pricePerNight;
      }
      else
      {
        this.currentPrice = this.data.price.priceOnHoliday;
      }
    }


    ShowReservationDialog(){
        const  dialogRef = this.dialog.open(ReservationComponent, {
          width: this.isSmallScreen ? '95%' : '80%',
          data:{
            pricePerNight : this.data.price.pricePerNight,
            priceOnHoliday : this.data.price.priceOnHoliday,
            idApartment: this.data.id,
            apartment: this.data
          } 
        });
        dialogRef.afterClosed().subscribe( result =>{
        })
    }
}
