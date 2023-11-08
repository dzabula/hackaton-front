import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateComponent } from '../dialog/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { ICategory } from 'src/app/shared/interface/i-category';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class CategoryComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ["name","delete"];
  categories :MatTableDataSource<any>;
  hasCategories: boolean = true;
  loading: boolean = true;
  isSmallScreen:boolean;

  public constructor( private router: Router,private categoryService: CategoryService ,private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,){

  }

  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.loadCateogries();
  }

  loadCateogries(){
    this.loading = true;
    this.categoryService.get().subscribe({
      next: response=>{
        this.hasCategories = response.length > 0;
        this.loading = false;
        this.categories = new MatTableDataSource(response);
        this.categories.paginator = this.paginator;

      },
      error:xhr=>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja kategorija. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  
        });
        console.log(xhr);
      }
    })
  }

  openCreateCategoryDialog(){
    const dialogCreate =  this.dialog.open(CreateComponent,{
      width: this.isSmallScreen ? '95%' : '80%',

    })

    dialogCreate.afterClosed().subscribe( result =>{
      if(result == "success"){
        this.loadCateogries();
      }
    })
  }

  deleteCategoryDailog(category: ICategory) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: this.isSmallScreen ? '95%' : '320px',
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete kategoriju: "+category.name+" ? Kategoriju ce moci samo Data Base administrator da vrati u upotrebu nakon brisanja!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.deleteCategory(category);
      }
    });
  }

  deleteCategory(category: ICategory){
    const token = localStorage.getItem("token");
    this.categoryService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.categoryService.delete(category.id).subscribe({
      next: response => {
        const arr = this.categories.data.filter(x=>x.id != category.id);
        this.categories = new MatTableDataSource(arr);
        const snack  = this.snackBar.open("Uspesno ste obrisali kategoriju.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      },
      error: xhr =>{
        this.loading = false;
        if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        
       const snack  = this.snackBar.open("Doslo je do greske prilikom brisnaja kategorije. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }
}
