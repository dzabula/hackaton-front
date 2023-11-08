import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { ApiService } from '../api.service';
import { IRate } from '../../interface/i-rate';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class RatesService extends ApiService<IRate> {

  constructor(client: HttpClient) {
    super(client,CONFIGURATION.APIURL+API.RATES);
  }
}
