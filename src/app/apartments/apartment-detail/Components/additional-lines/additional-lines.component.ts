import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-additional-lines',
  templateUrl: './additional-lines.component.html',
  styleUrls: ['./additional-lines.component.css']
})
export class AdditionalLinesComponent {
  @Input() name:string;
  @Input() description:string;
  lines: string[] = ["Portiv pozarna zastita","Izlazi u slucaju opasnosti","Zgrada mladja od 5 goidna","Zastita od udara groma"];
}
