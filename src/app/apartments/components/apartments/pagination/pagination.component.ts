import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit  {

  @Input() totalItems:number;
  @Input() currentPage:number;
  @Input() pageSize:number = 6;
  @Input() numberPages:number;


  @Output() changingPage = new EventEmitter<number>();




  constructor(){
  }

  ngAfterViewInit(): void {

  }



  ngOnInit(): void {

;
  }

  next():void{
    this.currentPage = this.currentPage+1;
    this.numberPages = Math.ceil(this.totalItems / this.pageSize);
    this.changingPage.emit(this.currentPage);
  }

  goToPage(newPage: number): void{
    this.changingPage.emit(newPage);
  }

  prev():void{
    if(this.currentPage > 1){
      this.currentPage = this.currentPage-1;
      this.changingPage.emit(this.currentPage);
     
    }
  }

}


