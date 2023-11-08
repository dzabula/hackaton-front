import { Component, Input, OnInit } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { RsdToEur } from 'src/app/shared/pipes/rsd-to-eur-pipe';

@Component({
  selector: 'app-single-apartment',
  templateUrl: './single-apartment.component.html',
  styleUrls: ['./single-apartment.component.css']
})
export class SingleApartmentComponent implements OnInit {

  @Input() data: IApartment;
  square: string;

  ngOnInit(): void {
    console.log("data",this.data);
    var specification = this.data.apartmentSpecifications;
    if(specification != null) var square = specification.filter(x=>x.specification == "Povrsina");
    if(square != null && square.length > 0) this.square = square[0].value; 
  }

  get getDescription(): string{
    return this.data.description;
  }


}
