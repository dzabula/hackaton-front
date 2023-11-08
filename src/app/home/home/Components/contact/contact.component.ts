import { Component } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  CONTACT_: any = CONTACT
}
