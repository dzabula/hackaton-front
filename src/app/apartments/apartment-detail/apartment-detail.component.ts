import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { never } from 'rxjs';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';
import { IComment } from 'src/app/shared/interface/i-comment';
import { IImage } from 'src/app/shared/interface/i-image';
import { IUser } from 'src/app/shared/interface/i-user';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { IRate } from 'src/app/shared/interface/i-rate';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {
  id:number;
  details: IApartment;
  images: IImage[];
  comments: IComment[];
  rates: IRate[];
  isLoadedGalery: boolean;
  firstWord: string = "PARADISE";
  smallText: string = "Apartmana";
  appUser: IApplicationUser;
  apartment: IApartment;
  mapString: string = "";
  isSmallScreen: boolean;
  isLogedIn: boolean;

  constructor(private cdRef: ChangeDetectorRef,
              private jwtHandler: JwtHandlerComponent,
              private route: ActivatedRoute,
              private apartmentService: ApartmentsService,
              private dialog: MatDialog  ,
              private breakpointObserver: BreakpointObserver
    )
  { 
  }
  
  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    if(!this.jwtHandler.IsValidToken()) this.appUser = null;
    else  this.appUser = this.jwtHandler.GetUser();
    
    this.isLogedIn = this.jwtHandler.IsValidToken();
    this.isLoadedGalery = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDetails(this.id);

    });

  }

  getDetails(id: number){
    this.apartmentService.getOne(id).subscribe({
      next: response=>{
        this.apartment = response;
        this.details = response;
        this.images = response.images;
        this.comments = response.comments;
        this.isLoadedGalery=true;
        this.mapString = response.googleMap
        this.rates = response.rates
        var date = new Date();
        if(date.getMonth()+1 > 5 && date.getMonth()+1 < 10)
        {
          this.apartment.price.regularPrice = this.apartment.price.pricePerNight;
        }
        else if((date.getMonth()+1 > 11 && date.getDate() > 20) || (date.getMonth()+1 == 1 && date.getDate() < 10) )
        {
          this.apartment.price.regularPrice = this.apartment.price.priceOnNewYear;
        }
        else this.apartment.price.regularPrice = this.apartment.price.priceOnHoliday;

      },
      error: xhr=>{
        alert("Doslo je do greske priliko ucitavanja  apartmana!")
        window.location.replace("/");
        console.log(xhr);
      }
    });
  }

  // metoda osvezava komentare kada se doda novi komentar
  onCommentAdded(message: string): void{
    if(!this.jwtHandler.IsValidToken()) return;
   
    this.apartmentService.getOne(this.id).subscribe({
      next: response=>{
        this.comments = response.comments;
      },
      error: xhr=>{
        alert("Doslo je do greske priliko ucitavanja  apartmana!")

      }
    });

    this.cdRef.detectChanges();

  }

  OpenReservationDialog(){
    const  dialogRef = this.dialog.open(ReservationComponent, {
      width: this.isSmallScreen ? '95%' : '80%',
      data:{
        pricePerNight : this.details.price.pricePerNight,
        priceOnHoliday : this.details.price.priceOnHoliday,
        priceOnNewYear : this.details.price.priceOnNewYear,
        idApartment: this.id,
        apartment:this.apartment
      } 
    });
    dialogRef.afterClosed().subscribe( result =>{
      
    })
  }
}
