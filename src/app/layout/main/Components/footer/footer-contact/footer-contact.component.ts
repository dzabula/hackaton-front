import { Component } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './footer-contact.component.html',
  styleUrls: ['./footer-contact.component.css']
})
export class FooterContactComponent {
  CONTACT:any;

  constructor(){
    this.CONTACT = CONTACT;
  }

}
