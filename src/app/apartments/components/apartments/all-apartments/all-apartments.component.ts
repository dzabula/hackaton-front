import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';

@Component({
  selector: 'app-all-apartments',
  templateUrl: './all-apartments.component.html',
  styleUrls: ['./all-apartments.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class AllApartmentsComponent implements OnInit  {
  @Input() items: IApartment[];
  

  constructor(private apartmentService: ApartmentsService){}




  ngOnInit(): void {
   

  }

}
