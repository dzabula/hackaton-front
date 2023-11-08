import { Component, Input } from '@angular/core';
import { ILink } from 'src/app/shared/interface/i-link';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() links: ILink[];
  @Input() activeRoute: string;
}
