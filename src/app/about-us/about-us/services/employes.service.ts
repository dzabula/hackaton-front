import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { IEmploye } from '../interface/i-employe';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class EmployesService extends ApiService<IEmploye> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, CONFIGURATION.STATICDATAURL + API.EMPLOYE);
  }
}
