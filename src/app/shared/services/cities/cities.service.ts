import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ICity } from '../../interface/i-city';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends ApiService<ICity> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.CITIES);
  }

  

}
