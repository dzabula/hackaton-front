import { Component, Input } from '@angular/core';
import { ILink } from 'src/app/shared/interface/i-link';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.css']
})
export class FooterNavComponent {
  @Input() activeRoute: string;
  @Input() links: ILink[];
}
