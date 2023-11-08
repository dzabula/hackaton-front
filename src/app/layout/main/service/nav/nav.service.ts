import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';

import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';
import { ILink } from 'src/app/shared/interface/i-link';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavService extends ApiService<ILink> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.STATICDATAURL + API.NAV);
  }

  getAdminLinks(): Observable<ILink[]>{

      return this.client.get<ILink[]>(CONFIGURATION.STATICDATAURL + API.ADMINNAV);
  }

  getUserLinks(): Observable<ILink[]>{

    return this.client.get<ILink[]>(CONFIGURATION.STATICDATAURL + API.USERNAV);
  }
}

  


