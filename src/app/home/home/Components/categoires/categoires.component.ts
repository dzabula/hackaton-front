import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interface/i-category';
import { CategoryService } from 'src/app/shared/services/categories/category.service';

@Component({
  selector: 'app-categoires',
  templateUrl: './categoires.component.html',
  styleUrls: ['./categoires.component.css']
})
export class CategoiresComponent implements OnInit{
  
  categories: ICategory[];

  constructor(private categoryService: CategoryService){

  }

  
  ngOnInit(): void {
    this.categoryService.get().subscribe({
      next: response =>{
        this.categories =  response;
      },
      error: xhr =>{
        console.log(xhr);
        alert("Doslo je do greske pogledajte konzolu!");
      }
    })
  }
}
