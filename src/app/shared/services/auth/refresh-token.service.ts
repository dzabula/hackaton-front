import { Injectable } from '@angular/core';
import { IApartment } from '../../interface/i-apartment';
import { ApiService } from '../api.service';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHandlerComponent } from '../../components/jwt-handler/jwt-handler.component';
import { Observable } from 'rxjs';
import { IToken } from '../../interface/i-token';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService  extends ApiService<IToken> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.REFRESHTOKEN);
    
  }


}
