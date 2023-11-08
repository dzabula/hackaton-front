import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { IApartment } from '../../interface/i-apartment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { Observable } from 'rxjs';
import { IPagination } from '../../interface/i-pagination';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService extends ApiService<IApartment> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.APARTMENTS);
    
  }

  getApartments(title:string,numPerson: number, start:string, end:string, minPrice :number, maxPrice:number, categoryIds: number[], cityIds: number[], pageNumber:number, pageSize:number)  :Observable<IPagination>{
    var params = new HttpParams()
                  .append("title",title)
                  .append("minPrice",minPrice)
                  .append("maxPrice",maxPrice)
                  .append("pageNumber",pageNumber)
                  .append("pageSize",pageSize);


    console.log("parametri",params)
    const cateogryParamsString = categoryIds.map(id => `CategoryIds=${id}`).join('&');
    const cityParamsString = cityIds.map(id => `CityIds=${id}`).join('&');
    var paramsString= "?"+params.toString();
    if(cateogryParamsString) paramsString += "&" + cateogryParamsString;
    if(cityParamsString) paramsString += "&" + cityParamsString;
    if(numPerson != null) paramsString += "&numPerson=" + numPerson;
    if(start != null) paramsString += "&start=" + start;
    if(end != null) paramsString += "&end" + end;


    return  this.client.get<IPagination>(this.url + paramsString )
        
  }
  
 

}
