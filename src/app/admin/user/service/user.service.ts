import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { IUser } from 'src/app/shared/interface/i-user';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class UserService  extends ApiService<IUser>  {


  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.USERS);
    
  }

  filterUser(keyword: string){
    const params = new HttpParams()
    .append("FullName",keyword);

    return  this.client.get<IUser[]>(this.url ,{params :params, headers:this.headers})
  }



}
