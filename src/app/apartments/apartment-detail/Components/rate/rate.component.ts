import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { IRate } from 'src/app/shared/interface/i-rate';
import { RatesService } from 'src/app/shared/services/rates/rates.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, AfterViewInit {
  @Input() apartmentId: number;
  @Input() rates: IRate[];
  avg: number;
  count:number;
  selectedRating: number | null = null; 
  currentUserRate: number = 0;
  hasRate: boolean;

  constructor(private rateService: RatesService,private dialog: MatDialog,private jwtHandler: JwtHandlerComponent){}
  ngAfterViewInit(): void {
    this.setRating();
    // this.setUserRatingForApartment();
  }

  ngOnInit(): void {    
    const values = this.rates.map(rate => rate.value); // Izdvojite vrednosti value iz objekata
    this.count = this.rates.length;
    this.avg = this.calculateAverage(values);
    if(this.avg > 0) this.hasRate = true;
    this.setUserRatingForApartment();
  }

  calculateAverage(arr: number[]): number {
    if (arr.length === 0) {
      return 0; // 
    }
    const sum = arr.reduce((total, num) => total + num, 0);
    const average = sum / arr.length;
    return Math.round(average * 10) / 10; 
  }


  private setRating() {
      // const roundedRating = Math.round(averageRating * 2) / 2;
      const roundedRating = this.avg;
      const containerDiv = document.getElementById("half-stars-example");
      if(containerDiv){
        const input = containerDiv.querySelector(`input[value="${roundedRating}"]`) as HTMLInputElement;
        if (input) {
            input.checked = true;
        }
      }
  }

  private setUserRatingForApartment(){
    if(!this.jwtHandler.IsValidToken())
    return;

    var currentUserId = this.jwtHandler.GetUser().UserId;
    var arr = this.rates.filter(x=>x.userId == currentUserId);
    var value;
    if(!arr && arr.length == 0) value = 0;
    else
    {
      if(arr[0])
        value = arr[0].value;
      else value = 0;
    }

    this.currentUserRate = value;
    const containerDiv = document.getElementById("full-stars-example-two");
    if(containerDiv){
      const input = containerDiv.querySelector(`input[value="${value.toString()}"]`) as HTMLInputElement;
      if (input) {
          input.checked = true;
      }
    }

  }

  rateApartment(){
    var value;
    const containerDiv = document.getElementById("full-stars-example-two");
    if(containerDiv){
      const input = containerDiv.querySelector('input:checked') as HTMLInputElement;
      if (input) {
         value = input.value;
      }
    }

    if(!this.jwtHandler.IsValidToken()) this.displayUnAuthorized();
    var token = localStorage.getItem("token");
    this.rateService.headers = new HttpHeaders().set("Authorization"," Bearer "+token);
    var body = {
      "apartmentId" : this.apartmentId,
      "value": value
    }

    this.rateService.put(body).subscribe({
      next: (response: any) =>{
        this.displaySuccess();
        this.currentUserRate = parseInt(body.value);
        if(!this.hasRate){
          this.hasRate = true;
          this.avg = parseInt(body.value);
          this.count = 1;
        }
        
      },
      error: (xhr: any)=>{
        if(xhr.status == 422){
          this.displayError(xhr.error.errors[0].error);
        }else{
          this.displayError();
        }     
      }
    })

  }

  displayUnAuthorized(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '320px',
      data: {
        title: "Greška!!!",
        message:"Morate biti ulogovani kako biste ostavili komentar!"
      } 
    });
  }

  displaySuccess(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '320px',
      data: {
        title: "Uspešno!!!",
        message:"Uspešno ste ocenili apartman!"
      } 
    });
  }

  displayError(message: string  = "Došlo je do greške na serveru. Pokušajte kasnije.!"){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '320px',
      data: {
        title: "Greška!!!",
        message: message
      } 
    });

  }

}
