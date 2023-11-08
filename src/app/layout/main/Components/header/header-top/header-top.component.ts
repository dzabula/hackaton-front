import { Component } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent {
  CONTACT: any;
  constructor(){
    this.CONTACT = CONTACT;
  }
}
