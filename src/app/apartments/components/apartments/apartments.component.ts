import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css'],
  
})
export class ApartmentsComponent {
  changeSignal: boolean = false;
  firstWord: string = "Ponuda";
  smallText: string = "Svih Apartmani";
  bigText: string = "Pronadjite vas kutak za opustanje";

  start_:string;
  end_:string;
  numPerson_:number;
  defaultCategoryId: number;
  params: any;
  loading: boolean = false;
  items: IApartment[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalItems: number = 0;
  numberPages: number =1;
  maxFatch: number = 10000;

  oldFilterData: any;
  helpVariableForMaxPrice: boolean = false;
  HasApartment: boolean = false;


  constructor(private route: ActivatedRoute,private apartmentService: ApartmentsService){}

  
  ngOnInit(): void {
   
    var id = this.route.snapshot.params['id'];
    this.start_ = this.route.snapshot.params['start'];
    this.end_ = this.route.snapshot.params['end'];
    this.numPerson_ = this.route.snapshot.params['numPerson'];

    if (!(id && !isNaN(id))) {
      id = 0;
    }
    if(!(this.start_ && this.start_.length>0))
    {
      this.start_ = null;
    }
    if(!(this.end_ && this.end_.length>0))
    {
      this.end_ = null;
    }
    if(!(this.numPerson_ && !isNaN(this.numPerson_)))
    {
      this.numPerson_ = 1;
    }
    this.defaultCategoryId = id;

    this.oldFilterData = {
      category:[id],
      city:[],
      minPrice:0,
      maxPrice:0,
      title:"",
      numPerson:this.numPerson_,
      start:this.start_,
      end:this.end_,

    }

    this.GetApartments(1,this.oldFilterData);  


  }

  FilterChange(params: any){
    this.GetApartments(1,params);
  }

  
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.GetApartments(newPage, null);
  }



  GetApartments(page:number, filterData: any ): void{
    this.loading = true;
    this.currentPage = page;

    if(filterData){
      this.oldFilterData = filterData;

//OBRISTAI LINIJIU KODA ISPOD OVOG POSLE KAKO BI FILTRIRANJE PRIMENILO BROJI OSOBA
      this.oldFilterData.numPerson = null;

      this.apartmentService.getApartments(this.oldFilterData.title,this.oldFilterData.numPerson,this.formatDateToYYYYMMDD(this.oldFilterData.start),
                                          this.formatDateToYYYYMMDD(this.oldFilterData.end),this.oldFilterData.minPrice,this.oldFilterData.maxPrice,
                                          this.oldFilterData.category,this.oldFilterData.city,this.currentPage,this.pageSize).subscribe({
          next:(response: any)=>{
            this.loading = false;
            this.HasApartment = response.numberApartments > 0;
            this.totalItems = response.numberApartments;
            this.numberPages = Math.ceil(this.totalItems / this.pageSize);
            this.items = response.apartments
            this.items.forEach(x=>{
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
          }
      })
    }
    else{

      this.apartmentService.getApartments(this.oldFilterData.title,this.oldFilterData.numPerson,this.formatDateToYYYYMMDD(this.oldFilterData.start),
                                          this.formatDateToYYYYMMDD(this.oldFilterData.end),this.oldFilterData.minPrice,this.oldFilterData.maxPrice,
                                          this.oldFilterData.category,this.oldFilterData.city,this.currentPage,this.pageSize).subscribe({
        next: (response:any) =>{
          this.loading = false;
          this.items = response.apartments;
          this.HasApartment = response.numberApartments > 0;
          this.totalItems = response.numberApartments;
          this.numberPages = Math.ceil(this.totalItems / this.pageSize);
          this.items.forEach(x=>{
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
        },
        error: xhr =>{
            console.log(xhr);
        }
      });
    }
  }

  formatDateToYYYYMMDD(date: Date) {
    if(date != null && date != undefined && date instanceof Date){
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  }



  
}
