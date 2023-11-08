import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import  'src/assets/js/0EsCMyYSrYBP.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,AfterViewInit  {  
  allApartments: IApartment[];
  premiumApartments: IApartment[];
  economicApartments: IApartment[];
  loadingAllApartments: boolean = true;
  loadingEconomicApartments: boolean = true;
  idEconomicCategory = 0;
  idPremiumCategory = 0;
  idLuxCategory = 0;

  constructor(private apartmentServis: ApartmentsService,
              private categoryService: CategoryService,
              private renderer: Renderer2){

  }
  ngAfterViewInit(): void {
    

  }
  ngOnInit(): void {
    this.economicApartments = [];
    this.premiumApartments = [];
   // this.loadAllApartments();
  }
  
  apartmentsLoaded(apartments: any){
    this.allApartments = apartments;
    this.loadingAllApartments = false;
  }

  loadAllApartments(){
    this.apartmentServis.getApartments("",null,null,null,0,0,[],[],1,10).subscribe({
      next:respones =>{
          this.allApartments = respones.apartments;
          this.allApartments.forEach(x=>{
            var date = new Date();
            if(date.getMonth()+1 > 5 && date.getMonth()+1 < 10)
            {
              x.price.regularPrice = x.price.pricePerNight;
            }
            else if((date.getMonth()+1 > 11 && date.getDate() > 20) || (date.getMonth()+1 == 1 && date.getDate() < 10) )
            {
              x.price.regularPrice = x.price.priceOnNewYear;
            }
            else x.price.regularPrice = x.price.priceOnHoliday;

          })
          this.loadExternalFiles();
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske prilikom ucitavanja primum apartmana! Pogledajte konzolu!");
      }
    });
  }



  loadExternalFiles(){
    var path1 = "assets/js/0Amain.js" ;
    var path2 = "assets/js/Pzd9jIG4P8zR.js"; 
    var script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.src = path2;
    this.renderer.appendChild(document.head, script2);
    this.loadingEconomicApartments = false;
    this.loadingAllApartments = false;
    script2.addEventListener('load', () => {
      this.loadingEconomicApartments = false;
      this.loadingAllApartments = false;
      
      
    });
  }
}
