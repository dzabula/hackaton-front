import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as L from 'leaflet'; 
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';


@Component({
  selector: 'app-baners',
  templateUrl: './baners.component.html',
  styleUrls: ['./baners.component.css']
})

export class BanersComponent implements OnInit {
  @Input() allApartments: IApartment[];
  @Output() apartmentsLoaded: EventEmitter<any> = new EventEmitter();
  searchForm: FormGroup;
  numbersOfPersons: number[] = [1,2,3,4,5,6,7,8,9];
  start: Date = new Date() ;
  end: Date = new Date();
  minEndDate: string;
  minStartDate: string;
  selectedNumPerson: number;

  map: L.Map;
  coordinates: [number, number][] = [[44.81676586647199, 20.454030799942384],[44.827302452291086, 20.460568339963203],
                                    [44.806389106448166, 20.48954899404669],[44.76723986454541, 20.479554648509948],
                                    [44.822131588147066, 20.4650780372339],[44.81930757802993, 20.489195067848723],
                                    [44.81481059549419, 20.488605984370363],[44.8247658999711, 20.400272344095832],
                                    [44.8034716452235, 20.388700751468107],[44.75894777136038, 20.416197602562825],
                                    [44.8034716459235, 20.388700751466107],[44.8034716482235, 20.388700751464107],
                                    [44.8034716892235, 20.388700769468107],];
  icon: any = L.icon({
    iconUrl: '/assets/images/marker-location.png',
    shadowUrl: '/assets/images/logo-paradise.png',
    className: 'animated-marker',
    iconSize:     [100, 100], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [25, -80] // point from which the popup should open relative to the iconAnchor
  });

  @ViewChild('dateEndPicker') dateEndPicker!: MatDatepicker<Date>;
  @ViewChild('dateStartPicker') dateStartPicker!: MatDatepicker<Date>;
  constructor(private apartmentService: ApartmentsService, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(){
    const currentDate = new Date();
    this.start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1,13,30,1);
    this.end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3,13,30,1);
    this.minStartDate = this.formatDateToYYYYMMDD(this.start);
    this.minEndDate = this.formatDateToYYYYMMDD(this.end);
    this.searchForm = this.formBuilder.group({
      numPerson: [""],
      start: [this.start],
      end: [this.end ] 
    });


    this.apartmentService.getApartments("",null,null,null,0,0,[],[],1,100).subscribe({
      next:response=>{
        this.allApartments = response.apartments;
        this.allApartments.forEach(x=>{
          var date = new Date();
          if(date.getMonth()+1 > 5 && date.getMonth()+1 < 10)
          {
            x.price.regularPrice = x.price.pricePerNight;
          }
          else if((date.getMonth()+1 > 11 && date.getDate() > 20) || (date.getMonth()+1 == 1 && date.getDate() < 10) )
          {
            x.price.regularPrice = x.price.priceOnNewYear;
          }
          else x.price.regularPrice = x.price.priceOnHoliday;
          

        });
        this.apartmentsLoaded.emit(this.allApartments);
        this.initMap();
      },
      error: xhr =>{

      }
    })
  }


  onDateStartChange() {
    var tmp = new Date(this.start);
    tmp.setDate(this.start.getDate() + 3);
    this.minEndDate =  tmp.toISOString().split('T')[0];
  }

  search(){
    var start = this.formatDateToYYYYMMDD(this.start);
    var end = this.formatDateToYYYYMMDD(this.end);
    var num = this.searchForm.get('numPerson').value;

    this.router.navigate(['/apartments/free/'+start+'/'+end+'/'+num]);

  }

  initMap() {
    this.map = new L.Map('map',{markerZoomAnimation: true,fadeAnimation:true, zoomControl: false});

    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '';
    const osm = new L.TileLayer(osmUrl, { minZoom: 2, maxZoom: 19, attribution: osmAttrib });

    this.map.setView(new L.LatLng(44.80219648452692, 20.387154605748677), 12);
    this.map.addLayer(osm);

    this.icon.options.shadowSize = [0,0];
    // const marker = L.marker([44.76723986454541, 20.479554648508948], {icon : this.icon}).addTo(this.map);
    // marker.bindPopup("<b><a routerLink='/apartments/32}}' class='pointer popup-title'>Botanischer Garten</a></b><br><div class='py-4'><a routerLink='/apartments/{{apartment.id}}' class='pointer'> <img class='w-100 popup-img radius-50' src='/assets/images/lcm2RTjZOh6O.jpg' alt=''></a></div>").openPopup();

    this.loadLocations();

  }

  loadLocations(){

    this.allApartments.forEach((a, index) => {
        const maxPerson = a.maxPerson;
        const marker = L.marker([this.coordinates[index][0],this.coordinates[index][1]],{icon: this.icon}).addTo(this.map);
        marker.bindPopup("<a ng-reflect-router-link='/apartments/"+a.id+"' href='/apartments/"+a.id+"' class='pointer popup-title w-100 d-block'>"+a.title+"</a><div class='py-1'><a ng-reflect-router-link='/apartments/"+a.id+"' href='/apartments/"+a.id+"' class='pointer'> <img class='w-100 popup-img' src='"+a.file.path+"' alt=''></a></div>Max. <i class='user-icon fa-solid fa-user-group'></i> &nbsp;" + maxPerson).openPopup();
    });   
  }

  addMarks(){
    this.coordinates.forEach((coordinate) => {
      const marker = L.marker(coordinate,{icon: this.icon, autoPanOnFocus: true}).addTo(this.map);
      marker.bindPopup("<b>Botanischer Garten</b><br><img class='w-100' src='/assets/images/lcm2RTjZOh6O.jpg' alt=''>is here").openPopup();
    })
 
  }
  
  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  
}

