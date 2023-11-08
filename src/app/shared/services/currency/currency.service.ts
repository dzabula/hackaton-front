import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { CURRENCY } from 'src/app/constants/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends ApiService<any>  {

  constructor(client: HttpClient) {
    super(client, CURRENCY.EUR);
    this.headers = new HttpHeaders().set("Access-Control-Allow-Origin","https://kurs.resenje.org");

  }




}
