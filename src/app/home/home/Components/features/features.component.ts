import { Component } from '@angular/core';
import { IFeatures } from '../../intefaces/i-features';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  features: IFeatures[] = [
    {
      icon:"icon-world",
      text:"Apartmana u ponudi!",
      number:20
    },
    {
      icon:"fa-regular fa-clock",
      text:"Gona iskustva!",
      number:6
    },
    {
      icon:"fa-regular fa-face-smile-beam",
      text:"Zadovoljnih klijenata!",
      number:10000
    }
  ]
}
