import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { IGetSpecification } from '../../interface/i-get-specification';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService extends ApiService<IGetSpecification> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.SPECIFICATIONS);
  }
}
