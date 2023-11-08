import { Component } from '@angular/core';

@Component({
  selector: 'app-section-video',
  templateUrl: './section-video.component.html',
  styleUrls: ['./section-video.component.css']
})
export class SectionVideoComponent {
  LinesOne: string[] = [
    "Zaštita od poplava",
    "Solarni Sistem",
    "Bazeni"
  ];
  LinesTwo: string[] = [
    "Protiv požarni sistemi",
    "Igraonice za decu",
    "Fitness Club"
  ]
  ytVideoLink: string = "https://www.youtube.com/watch?v=0zh784btq-U";
}
