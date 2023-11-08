import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/shared/interface/i-image';
import { IThumb } from 'src/app/shared/interface/i-thumb';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
    @Input() thumb: IImage;
    @Input() images: IImage[];
    @Input() isLoadedGalery: boolean;

    ngOnInit(): void {
      this.images.push(this.thumb);
      console.log("thumb", this.thumb);
      console.log("images", this.images);
    }
    

}

