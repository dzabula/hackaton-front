import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-premium-apartments',
  templateUrl: './premium-apartments.component.html',
  styleUrls: ['./premium-apartments.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class PremiumApartmentsComponent implements OnInit {
  @Input() allApartments: IApartment[];
  @Input() loadingAllApartments: boolean =true;
  ngOnInit(): void {
   
  }
  @ViewChild('slider') slider: ElementRef;
  @ViewChildren(CdkDrag) slides: QueryList<CdkDrag>;

  slideWidth = 800;
  slideOffset = 0;
  sliderWidth = 0;

  ngAfterViewInit() {
    this.sliderWidth = this.slides.length * this.slideWidth;
  }

  moveSlider(offset: number) {
    this.slideOffset += offset;
    if (this.slideOffset > 0) {
      this.slideOffset = 0;
    } else if (this.slideOffset < -(this.sliderWidth - this.slideWidth)) {
      this.slideOffset = -(this.sliderWidth - this.slideWidth);
    }
    this.slider.nativeElement.style.transform = `translateX(${this.slideOffset}px)`;
  }
}
