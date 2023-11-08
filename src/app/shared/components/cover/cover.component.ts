import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent {
  @Input() firstWord: string;
  @Input() smallText: string;
  @Input() bigText: string;
}
