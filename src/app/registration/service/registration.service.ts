import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends ApiService<boolean> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.LOGIN) 
  }

}
