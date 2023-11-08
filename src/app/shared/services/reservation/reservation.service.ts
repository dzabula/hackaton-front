import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ApiService } from '../api.service';
import { IReservation } from '../../interface/i-reservation';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService extends ApiService<IReservation> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.RESERVATION);
  }

  markCancelOrRecancel(id:number){
    return this.client.post(CONFIGURATION.APIURL + API.RESERVATION+"/markCancelOrRecancel",id,{headers:this.headers});
  }

  markPaid(id: number) {
    return this.client.post(CONFIGURATION.APIURL + API.RESERVATION,id,{headers:this.headers});
  }

  CancelledYourSelf(id: number){
    return this.client.post(CONFIGURATION.APIURL + API.RESERVATION+"/CancelledYourSelf",id,{headers:this.headers});
  }

  filterReservation(createdAtFrom: string, createdAtTo: string, isPaid: string, apartmentKeyWord: string){
    const params = new HttpParams()
    .append("CreatedAtFrom",createdAtFrom)
    .append("CreatedAtTo",createdAtTo)
    .append("IsPaid",isPaid)
    .append("ApartmentKeyWord",apartmentKeyWord)

    return  this.client.get<IReservation[]>(this.url ,{params :params, headers:this.headers})
  }

  filterReservationYourSelf(createdAtFrom: string, createdAtTo: string, isPaid: string,apartmentKeyWord: string){
    const params = new HttpParams()
    .append("CreatedAtFrom",createdAtFrom)
    .append("CreatedAtTo",createdAtTo)
    .append("IsPaid",isPaid)
    .append("apartmentKeyWord",apartmentKeyWord)

    return  this.client.get<IReservation[]>(this.url+"/GetYourSelf" ,{params :params, headers:this.headers})
  }
}
