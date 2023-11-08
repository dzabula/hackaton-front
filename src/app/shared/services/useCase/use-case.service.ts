import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class UseCaseService extends ApiService<boolean> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.USECASE);
  }
}
