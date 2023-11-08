import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ApiService<number> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.EMAIL);
  }

}
