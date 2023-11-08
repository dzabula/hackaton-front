import { Component, Input } from '@angular/core';
import { ILink } from 'src/app/shared/interface/i-link';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    @Input() links: ILink[];
    @Input() activeRoute: string;

    CONTACT: any;
    constructor(){
      this.CONTACT = CONTACT;
    }
}
