import { Component } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';
@Component({
  selector: 'app-footer-bottom',
  templateUrl: './footer-bottom.component.html',
  styleUrls: ['./footer-bottom.component.css']
})
export class FooterBottomComponent {
  CONTACT: any;
  constructor(){
    this.CONTACT = CONTACT
  }
}
