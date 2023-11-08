import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit{
  @Input() mapString: string;
  safeString: SafeHtml;
  constructor(private sanitizer: DomSanitizer,private elementRef: ElementRef){}

  
  ngOnInit(): void {
    this.safeString =  this.sanitizer.bypassSecurityTrustHtml(this.mapString);

  }



  

}
