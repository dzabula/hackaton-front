import { Component } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-location-and-contact',
  templateUrl: './location-and-contact.component.html',
  styleUrls: ['./location-and-contact.component.css']
})
export class LocationAndContactComponent {
  CONTACT_: any = CONTACT;

}
