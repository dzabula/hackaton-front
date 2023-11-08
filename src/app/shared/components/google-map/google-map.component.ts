import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CONTACT} from 'src/app/constants/contact';
import * as L from 'leaflet'; 

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  googleMapSrc: string = CONTACT.GOOGLEMAP;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {

  }

  get sanitizedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.googleMapSrc);
  }


}
