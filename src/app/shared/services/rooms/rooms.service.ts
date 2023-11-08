import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { IRooms } from '../../interface/i-rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService  extends ApiService<IRooms> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.ROOMS);
  }
}
