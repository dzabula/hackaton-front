import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILink } from 'src/app/shared/interface/i-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() links: ILink[];
  @Input() activeRoute: string;


}
