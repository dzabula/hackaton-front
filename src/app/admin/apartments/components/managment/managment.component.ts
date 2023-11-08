import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PopUpComponent } from 'src/app/shared/Dialogs/pop-up/pop-up.component';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';
import { EditComponent } from '../dialog/edit/edit.component';
import { InsertComponent } from '../dialog/insert/insert.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { ICategory } from 'src/app/shared/interface/i-category';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IRate } from 'src/app/shared/interface/i-rate';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class ManagmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["thumb","title","description","pricePerNight",
                                "priceOnHoliday","priceOnNewYear","category","city","rate"
                                ,"Edit","Delete"];
  apartments :MatTableDataSource<any>;
  selectedCategories: number[];
  apartmentKeyWord: string = "";
  categories: ICategory[];
  hasApartment: boolean = true;
  loading: boolean = true;
  isSmallScreen:boolean;

  constructor(
    private categoryService: CategoryService,
    private apartmentService  :ApartmentsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog  ,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ){

  }
  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.getCategories();
    this.filtrate();
  }

  filtrate(){
    var catIds : number[] = [];
    if(this.selectedCategories) catIds = this.selectedCategories;

    this.loading = true;

    this.apartmentService.getApartments(this.apartmentKeyWord,null,null,null,0,0,catIds,[],1,1000).subscribe({
      next: data => {
          this.hasApartment = data.numberApartments > 0;
          this.loading = false;
          this.apartments = new MatTableDataSource(data.apartments);
          this.apartments.paginator = this.paginator;

      },
      error: xhr => {
        this.loading = false;
        this.snackBar.open("Doslo je do greske prilikom ucitavanja apartmana. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
        });
      }
    })
  }

  getCategories(){
    this.categoryService.get().subscribe({
      next: response =>{
        this.categories = response;
        var tmp = this.categories[0];
          this.categories[this.categories.length] = tmp
          this.categories[0] = {
            id:0,
            name:"Sve"
          };
      },
      error:xhr=>{
        alert("Doslo je do greske prilikom ucitavanja kategorija!")
        console.log(xhr);
      }
    })
  }

  openDialog(title: string,message: string){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '320px',
      data: {
        title: title,
        message:message
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateApartmentDialog(apartman: IApartment){
    const dialogEdit =  this.dialog.open(EditComponent,{
      width: this.isSmallScreen ? '95%' : '80%',
      data:{
        currentApartment:apartman,
        categories: this.categories
      }
    })

    dialogEdit.afterClosed().subscribe( result =>{
      if(result != "dismiss" ){// prihvatamo Id kako bismo u glavnoji tabeli azurirali samo onaj apartman koji je editovan  
        this.apartmentService.getOne(result).subscribe({
          next: response=>{
            const rowIndex = this.apartments.data.findIndex(item => item.id === result); 
            var rowToUpdate = { ...this.apartments.data[rowIndex] };
            rowToUpdate = response; 
            this.apartments.data[rowIndex] = rowToUpdate;
            this.apartments.data = [...this.apartments.data];
          },
          error: xhr => {
            console.log(xhr);
            this.filtrate();
          }
        })
      }
    })
  }
  
  openCreateApartmentDialog(){
    const dialogEdit =  this.dialog.open(InsertComponent,{
      width: this.isSmallScreen ? '95%' : '80%'
    })

    dialogEdit.afterClosed().subscribe( result =>{
      if(result == "success"){
        this.filtrate();
      }
    })
  }
  
  deleteApartmentDialog(apartman: IApartment) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete apartman: "+apartman.title+" ? Apartman ce moci samo Data Base administrator da vrati u upotrebu nakon brisanja!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.deleteApartment(apartman);
      }
    });
  }

  deleteApartment(apartment:any){

    var token = localStorage.getItem("token");
    this.apartmentService.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    this.apartmentService.delete(apartment.id).subscribe({
      next: resposne =>{
        const index = this.apartments.data.indexOf(apartment);
        if (index >= 0) {
          this.apartments.data.splice(index, 1);
          this.apartments._updateChangeSubscription(); // Osvježavanje podataka u MatTableDataSource
        }

       const snack = this.snackBar.open("Uspesno ste opbrisali apartman!", 'Zatvori', {
          panelClass: 'success-snackbar',
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
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
  
  /*HELP FUNCTION */
  avgRate(rates:IRate[]):number {
    const arr = rates.map(rate => rate.value);
    if (arr.length === 0) {
      return 0; // 
    }
    const sum = arr.reduce((total, num) => total + num, 0);
    const average = sum / arr.length;
    return Math.round(average * 10) / 10; 
  }

  shortenString(str: string) {
    if(!str) return "";
    if (str.length > 20) {
      return str.substring(0, 17) + '...';
    }
    return str;
  }
}
