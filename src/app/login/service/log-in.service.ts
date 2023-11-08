import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { IToken } from 'src/app/shared/interface/i-token';
import { ApiService } from 'src/app/shared/services/api.service';



@Injectable({
  providedIn: 'root'
})
export class LogInService extends ApiService<IToken> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.LOGIN) 
  }

  

}
