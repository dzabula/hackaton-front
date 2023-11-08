import { Component, Input } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { RsdToEur } from 'src/app/shared/pipes/rsd-to-eur-pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-economic-apartment',
  templateUrl: './economic-apartment.component.html',
  styleUrls: ['./economic-apartment.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class EconomicApartmentComponent {
  @Input() economicApartments: IApartment[];
  @Input() loadingEconomicApartments: boolean;
  constructor(){
  }
  
}
