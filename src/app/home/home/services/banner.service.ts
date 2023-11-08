import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { IBanner } from '../intefaces/i-banner';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class BannerService extends ApiService<IBanner> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.STATICDATAURL+API.BANNERS)
  }
}
