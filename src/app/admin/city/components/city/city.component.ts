import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateComponent } from '../dialog/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { ICity } from 'src/app/shared/interface/i-city';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-category',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class CityComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ["name","delete"];
  cities :MatTableDataSource<any>;
  hasCities: boolean = false;
  loading: boolean = true;
  isSmallScreen:boolean;


  public constructor( private router: Router,private cityService: CitiesService ,private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    ){

  }

  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.loadCities();
  }

  loadCities(){
    this.loading = true;

    this.cityService.get().subscribe({
      next: response=>{
        this.loading = false;
        this.hasCities = response.length > 0;
        this.cities = new MatTableDataSource(response);
        this.cities.paginator = this.paginator;

      },
      error:xhr=>{
        this.loading = false;
        this.snackBar.open("Doslo je do greske prilikom ucitavanja gradova. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  
        });
        console.log(xhr);
      }
    })
  }

  openCreateCityDialog(){
    const dialogCreate =  this.dialog.open(CreateComponent,{
      width: this.isSmallScreen ? '95%' : '80%',

    })

    dialogCreate.afterClosed().subscribe( result =>{
      if(result == "success"){
        this.loadCities();
      }
    })
  }

  deleteCityDialog(city: ICity) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete grad: "+city.name+" ? Grad ce moci samo Data Base administrator da vrati u upotrebu nakon brisanja!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.deleteCity(city);
      }
    });
  }

  deleteCity(city: ICity){
    const token = localStorage.getItem("token");
    this.cityService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.cityService.delete(city.id).subscribe({
      next: response => {
        const arr = this.cities.data.filter(x=>x.id != city.id);
        this.cities = new MatTableDataSource(arr);
        const snack  = this.snackBar.open("Uspesno ste obrisali grad.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      },
      error: xhr =>{
        console.log(xhr);
        if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        
       const snack  = this.snackBar.open("Doslo je do greske prilikom brisnaja grada. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }
}
